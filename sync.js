async function syncHubspotToPipedrive() {


        // ... some code that syncs the data ...
    
        // Return results, for example:
        return {
            hubspotFetched: 10, // Number of records fetched from HubSpot
            pipedriveUpdated: 8, // Number of records updated in Pipedrive
            errors: [] // List of any errors encountered
        };
    }
    const hubspotData = await fetchHubspotContacts();

    // Ensure that the response contains the results array
    if (!hubspotData || !Array.isArray(hubspotData.results)) {
        throw new Error('Invalid data received from HubSpot');
    }
    
    // Convert HubSpot contacts to Pipedrive persons format
    const pipedriveData = hubspotData.results.map(contact => {
        // Extract properties from the HubSpot contact
        const firstname = contact.properties.firstname || contact.properties.email;
        const email = contact.properties.email;

        // Log the properties for debugging purposes
        console.log(contact.properties);

        // Validate the name attribute
        if (!firstname && !email) {
            throw new Error('Both firstname and email are missing for a contact.');
        }

        return {
            name: firstname,
            email: email
        };
    });

    await updatePipedrivePersons(pipedriveData);
}

module.exports.syncHubspotToPipedrive = async function() {
}
