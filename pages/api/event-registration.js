import path from 'path';
import fs from 'fs';

function buildPath() {
    return path.join(process.cwd(), 'data', 'data.json');
}

function extractData(filePath) {
    const jsonData = fs.readFileSync(filePath);
    const data = JSON.parse(jsonData);
    return data;
}

export default function handler (req, res) {
    const { method } = req;

    const filePath = buildPath();
    const { events_categories, all_events } = extractData(filePath);

    if (!all_events) {
        return res.status(404).json({ message: 'No events found' });
    }

    if (method === 'POST') {
        const { email, name, eventId } = req.body;

        if (!email || !email.includes('@') || !name) {
            res.status(422).json({ message: 'Please make sure all fields are filled in correctly!'});
            return;
        }

        const allEvents = all_events.map(event => {
            if (event.id === eventId) {
                if (event.emails_registered.length.toString() === event.max_registrations) {
                    res.status(409).json({ message: 'Sorry, this event has already reached the maximum number of registrations' });
                    return event;
                } else if (event.emails_registered.includes(email)) {
                    res.status(409).json({ message: `The email ${email} has already been registered.` });
                    return event;
                } else {
                    return {
                        ...event, emails_registered:[ ...event.emails_registered, email ]
                    }
                }
            }
            return event;
        });

        fs.writeFileSync(filePath, JSON.stringify({events_categories, all_events: allEvents}));

        res.status(200).json({ message: 'You have been registered successfully.' });
    }
}
