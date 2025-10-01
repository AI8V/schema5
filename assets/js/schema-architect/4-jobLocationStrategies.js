'use strict';

/**
 * @file jobLocationStrategies.js
 * @description Implements the Strategy Pattern for handling different JobPosting location types.
 * @version 1.0.0 - Refactored for Clarity and Scalability
 */

// Base class (Interface) for all location strategies
class BaseLocationStrategy {
    constructor(schema, entities, dom) {
        this.schema = schema;
        this.entities = entities;
        this.DOM = dom;
        this.findAddressPart = (prop) => this.entities.find(e => e.type === 'JobPosting:AddressPart' && e.schemaProp === prop);
    }

    /**
     * Applies the location logic to the schema.
     * This method must be implemented by subclasses.
     */
    apply() {
        throw new Error("Strategy's apply() method must be implemented.");
    }
}

// Strategy for Physical locations
class PhysicalLocationStrategy extends BaseLocationStrategy {
    apply() {
        const address = { "@type": "PostalAddress" };
        const street = this.DOM.customJobStreetAddress.value.trim() || this.findAddressPart('streetAddress')?.value;
        const city = this.DOM.customJobAddressLocality.value.trim() || this.findAddressPart('addressLocality')?.value;
        const region = this.DOM.customJobAddressRegion.value.trim() || this.findAddressPart('addressRegion')?.value;
        const postalCode = this.DOM.customJobPostalCode.value.trim() || this.findAddressPart('postalCode')?.value;
        const country = this.DOM.customJobAddressCountry.value.trim() || this.findAddressPart('addressCountry')?.value;

        if (street) address.streetAddress = street;
        if (city) address.addressLocality = city;
        if (region) address.addressRegion = region;
        if (postalCode) address.postalCode = postalCode;
        if (country) address.addressCountry = country;

        if (Object.keys(address).length > 1) {
            this.schema.jobLocation = { "@type": "Place", "address": address };
        }
    }
}

// Strategy for Remote locations
class RemoteLocationStrategy extends BaseLocationStrategy {
    apply() {
        this.schema.jobLocationType = "TELECOMMUTE";
        const applicantCountry = this.DOM.customJobApplicantCountry.value.trim() || this.findAddressPart('addressCountry')?.value;
        
        if (applicantCountry) {
            this.schema.applicantLocationRequirements = { "@type": "Country", "name": applicantCountry };
        }
        
        if (!this.schema.title.toLowerCase().includes('remote')) {
            this.schema.title += ' (Remote)';
        }
    }
}

// Strategy for Hybrid locations
class HybridLocationStrategy extends BaseLocationStrategy {
    apply() {
        // A hybrid job has both a remote component and a physical one.
        // We can achieve this by simply applying both strategies.
        new RemoteLocationStrategy(this.schema, this.entities, this.DOM).apply();
        new PhysicalLocationStrategy(this.schema, this.entities, this.DOM).apply();

        // Correct the title to be more specific
        this.schema.title = this.schema.title.replace('(Remote)', '(Hybrid)');
        if (!this.schema.title.toLowerCase().includes('hybrid')) {
            this.schema.title += ' (Hybrid)';
        }
    }
}

// Factory to create the correct strategy instance
const JobLocationStrategyFactory = {
    create(locationType, schema, entities, dom) {
        const strategies = {
            physical: PhysicalLocationStrategy,
            remote: RemoteLocationStrategy,
            hybrid: HybridLocationStrategy
        };
        const StrategyClass = strategies[locationType] || strategies.physical; // Default to physical
        return new StrategyClass(schema, entities, dom);
    }
};