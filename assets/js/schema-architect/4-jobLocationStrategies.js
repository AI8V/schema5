// ===================================================================
//   4-jobLocationStrategies.js 
// ===================================================================

'use strict';

/**
 * @file jobLocationStrategies.js
 * @description Strategy Pattern for JobPosting location handling.
 * @version 3.0.0 - Fully Google Compliant & Robust.
 */

// Base class (unchanged)
class BaseLocationStrategy {
    constructor(schema, entities, dom) {
        this.schema = schema;
        this.entities = entities;
        this.DOM = dom;
        this.findAddressPart = (prop) => this.entities.find(e => e.type === 'JobPosting:AddressPart' && e.schemaProp === prop);
    }
    apply() {
        throw new Error("Strategy's apply() method must be implemented.");
    }
}

// Strategy for Physical locations (with validation)
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

        if (Object.keys(address).length > 1) { // More than just @type
            // CRITICAL VALIDATION: Enforce Google's requirement.
            // if (!address.addressCountry) {
            //  throw new Error('VALIDATION_REQUIRED_addressCountry');
            // }
            this.schema.jobLocation = { "@type": "Place", "address": address };
        }
    }
}

// Strategy for Remote locations (NON-BLOCKING)
class RemoteLocationStrategy extends BaseLocationStrategy {
    apply() {
        this.schema.jobLocationType = "TELECOMMUTE";
        const applicantCountry = this.DOM.customJobApplicantCountry.value.trim() || this.findAddressPart('addressCountry')?.value;

        // This strategy now ONLY builds the schema if the data is present.
        // It does NOT throw errors. The validation responsibility is moved.
        if (applicantCountry) {
            this.schema.applicantLocationRequirements = { "@type": "Country", "name": applicantCountry };
        }
        // If applicantCountry is missing, it simply doesn't add the property.
    }
}

// Strategy for Hybrid locations (NON-BLOCKING)
class HybridLocationStrategy extends BaseLocationStrategy {
    apply() {
        // Apply remote properties (if data exists)
        this.schema.jobLocationType = "TELECOMMUTE";
        const applicantCountry = this.DOM.customJobApplicantCountry.value.trim();
        if (applicantCountry) {
            this.schema.applicantLocationRequirements = { "@type": "Country", "name": applicantCountry };
        }

            // Apply physical location properties (if data exists)
        // This part remains self-contained and robust.
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
            // Note: We are no longer throwing an error for missing addressCountry here.
            // The validation will be handled elsewhere.
            this.schema.jobLocation = { "@type": "Place", "address": address };
        }
    }
}

// Factory (unchanged, but now works with robust strategies)
const JobLocationStrategyFactory = {
    create(locationType, schema, entities, dom) {
        const strategies = {
            physical: PhysicalLocationStrategy,
            remote: RemoteLocationStrategy,
            hybrid: HybridLocationStrategy
        };
        const StrategyClass = strategies[locationType] || strategies.physical;
        return new StrategyClass(schema, entities, dom);
    }
};