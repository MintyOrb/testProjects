female = ['F','Woman','Female','Girl']
male = ["Male", "Man","Boy"]
other = ['None','x','Other',""]

contactsUpdated = 0

for person in persons:
	if contact['Gender__c'] in female:
		contactsUpdated += 1
		sf.Contact.update(contact["Id"],{
			"Gender__c": "W",
		})
	if contact['Gender__c'] in male:
		contactsUpdated += 1
		sf.Contact.update(contact["Id"],{
			"Gender__c": "M",
		})
	if contact['Gender__c'] in other:
		contactsUpdated += 1
		sf.Contact.update(contact["Id"],{
			"Gender__c": "",
		})