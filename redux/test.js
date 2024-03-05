const { format } = require('date-fns');

const shiftData = [{ "id": "a9e8cd05-10a0-4c3f-8ec4-6400fd495a2e", "booked": false, "area": "Helsinki", "startTime": 1707373800000, "endTime": 1707381000000 }, { "id": "1ab02f79-d2ce-4345-9bf7-10f5e7596668", "booked": false, "area": "Helsinki", "startTime": 1707366600000, "endTime": 1707373800000 }, { "id": "b10cbded-a35b-4f10-91cb-7f25496f9b64", "booked": false, "area": "Helsinki", "startTime": 1707388200000, "endTime": 1707393600000 }, { "id": "15c9b794-37da-4777-af58-9132223c6cb0", "booked": false, "area": "Turku", "startTime": 1707388200000, "endTime": 1707393600000 }, { "id": "4d8eb2c1-d815-4a41-820d-675563b65709", "booked": false, "area": "Helsinki", "startTime": 1707370200000, "endTime": 1707377400000 }, { "id": "37da2a9d-cf0d-4c2d-afff-1022898a94a2", "booked": false, "area": "Helsinki", "startTime": 1707366600000, "endTime": 1707384600000 }, { "id": "cdc13fe7-a216-4f1f-86dd-63406dde503f", "booked": false, "area": "Turku", "startTime": 1707366600000, "endTime": 1707372000000 }, { "id": "39a7f130-234f-488f-996b-f9f8bd1cda2f", "booked": false, "area": "Turku", "startTime": 1707370200000, "endTime": 1707377400000 }, { "id": "248698cd-5cc4-4f2e-862e-ac9bcf676527", "booked": false, "area": "Turku", "startTime": 1707366600000, "endTime": 1707373800000 }, { "id": "3fe088a2-393f-4cb3-aebf-22701ebf92fa", "booked": false, "area": "Turku", "startTime": 1707395400000, "endTime": 1707402600000 }, { "id": "b9e78124-ef17-4923-aa0c-17f56446f30d", "booked": false, "area": "Tampere", "startTime": 1707363000000, "endTime": 1707373800000 }, { "id": "c497cd93-928a-4e15-b7a5-b016bdfe59a3", "booked": false, "area": "Tampere", "startTime": 1707366600000, "endTime": 1707373800000 }, { "id": "bdc81a2d-1853-4b0d-9790-7ce5d0ef313a", "booked": false, "area": "Tampere", "startTime": 1707373800000, "endTime": 1707381000000 }, { "id": "a5e2a6e1-1034-4ccf-9836-48f6be6c66bd", "booked": false, "area": "Tampere", "startTime": 1707381000000, "endTime": 1707390000000 }, { "id": "187cc36f-7c03-4ac1-86cb-d64903602ba4", "booked": false, "area": "Helsinki", "startTime": 1707460200000, "endTime": 1707467400000 }, { "id": "d912a6de-2616-444b-9261-a292b9cc6e4c", "booked": false, "area": "Helsinki", "startTime": 1707467400000, "endTime": 1707476400000 }, { "id": "4182ff5e-5e2c-4d57-98d5-c36c9697dffb", "booked": false, "area": "Turku", "startTime": 1707460200000, "endTime": 1707467400000 }, { "id": "7e978084-5987-4191-b999-0bfcae210b3e", "booked": false, "area": "Helsinki", "startTime": 1707467400000, "endTime": 1707476400000 }, { "id": "4a9169f2-f170-447d-a8c0-a697c40550ff", "booked": false, "area": "Turku", "startTime": 1707622200000, "endTime": 1707625800000 }, { "id": "4fdbd246-9561-4065-b887-e8f61ffed5b6", "booked": false, "area": "Turku", "startTime": 1707625800000, "endTime": 1707634800000 }, { "id": "d0cec5c7-12e3-47d6-9a79-4b7d442f0c42", "booked": false, "area": "Turku", "startTime": 1707634800000, "endTime": 1707643800000 }, { "id": "8743dc2e-14cf-4783-9f65-bdcad29c358f", "booked": false, "area": "Helsinki", "startTime": 1707625800000, "endTime": 1707642000000 }, { "id": "81875e68-2208-47ca-848e-2b6de5d4f1fa", "booked": false, "area": "Helsinki", "startTime": 1707640200000, "endTime": 1707649200000 }, { "id": "0f44ba3f-a3da-4de4-8dc8-057592094b93", "booked": false, "area": "Tampere", "startTime": 1707625800000, "endTime": 1707633000000 }, { "id": "b659913c-9cf7-4050-b21c-65faac286dac", "booked": false, "area": "Tampere", "startTime": 1707633000000, "endTime": 1707640200000 }, { "id": "a556c941-5514-411e-b796-40b4ffc7aad6", "booked": false, "area": "Tampere", "startTime": 1707636600000, "endTime": 1707643800000 }, { "id": "d0abe4d6-45f9-4bde-bc8c-8130b63b6526", "booked": false, "area": "Helsinki", "startTime": 1707708600000, "endTime": 1707715800000 }, { "id": "5e1571f0-90ac-4049-bd60-6d0600d4aab7", "booked": false, "area": "Helsinki", "startTime": 1707715800000, "endTime": 1707724800000 }, { "id": "1a0527c6-05a6-451e-b9a0-bc2674d5ca2f", "booked": false, "area": "Helsinki", "startTime": 1707719400000, "endTime": 1707730200000 }, { "id": "f42e2e69-50cb-4889-b2fb-32113c0dc544", "booked": false, "area": "Helsinki", "startTime": 1707741000000, "endTime": 1707751800000 }, { "id": "ae218662-f438-4c57-8ed1-c8dd4b617736", "booked": false, "area": "Tampere", "startTime": 1707708600000, "endTime": 1707719400000 }, { "id": "5f5c36d0-c26d-4d0d-b209-c7b2a5c0b33f", "booked": false, "area": "Tampere", "startTime": 1707719400000, "endTime": 1707732000000 }, { "id": "538d2485-03de-4050-af30-fbfe1d249299", "booked": false, "area": "Tampere", "startTime": 1707730200000, "endTime": 1707741000000 }, { "id": "704a498f-94e1-4550-ac07-ae325547870a", "booked": false, "area": "Tampere", "startTime": 1707737400000, "endTime": 1707748200000 }]

const StartTimes = (shiftData.map(item => item.startTime))
const endTime = (shiftData.map(item => item.endTime))

for (let i = 0; i < StartTimes.length; i++) {
    const date = new Date(StartTimes[i])
    console.log(date.getHours(), date.getMinutes());
}


for (let i = 0; i < endTime.length; i++) {
    const date = new Date(endTime[i])
    console.log(date.getHours())
}
for (let i = 0; i < endTime.length; i++) {
    const formatt = format(new Date(endTime[i]), "MM-dd")
    console.log(formatt)
}


for (let i = 0; i < shiftData.length; i++) {
    const staty = new Date(shiftData[i].startTime)
    const end = new Date(shiftData[i].endTime)
    console.log(`${staty.getHours()} : ${staty.getMinutes()} - ${end.getHours()}:${end.getMinutes()} `)
}