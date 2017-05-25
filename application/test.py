events
eventDb

events_ids = [item['id'] for item in events]
eventDb_ids = [item['id'] for item in eventDb]

filtered_ids = []
for id_ in events_ids:
	if id_ not in eventDb_ids:
		filtered_ids.append(id_)

filtered_events = []
for event in events:
	if event['id'] in filtered_ids:
		filtered_events.append(event)


for key in events.keys():
	if key not in eventDb:
		do_something()

for event in events['items']:
	if len(item):
		for item in eventDb:
			if 'date' in event['start']:
				if item.date == event["start"]["date"][:10] and item.event_detail == event['summary'] and item.gid != event['id']:
					item.gid = event['id']
					db.session.commit()

				elif item.date == event["start"]["date"][:10] and item.event_detail == event['summary'] and item.gid == event['id']:
				else:
					eventAdd = Event(
						date=event['start']['date'][:10],
						starttime=event['start']['date'][11:][:5],
						endtime=event['end']['date'][11:][:5],
						event_detail=event['summary'],
						from_data='event',
						gid=event['id']
						)
					eventAdd.user = user
					db.session.add(eventAdd)
					db.session.commit()


			else:
				if item.date == event["start"]["dateTime"][:10] and item.event_detail != event['summary'] and item.gid != event['id']:
					item.gid = event['id']
					db.session.commit()

				elif item.date == event["start"]["dateTime"][:10] and item.event_detail == event['summary'] and item.gid == event['id']:
				
				else:
					eventAdd = Event(
						date=event['start']['dateTime'][:10],
						starttime=event['start']['dateTime'][11:][:5],
						endtime=event['end']['dateTime'][11:][:5],
						event_detail=event['summary'],
						from_data='event',
						gid=event['id']
						)
					eventAdd.user = user
					db.session.add(eventAdd)
					db.session.commit()

	else:
		if 'date' in event['start']:
			eventAdd = Event(
						date=event['start']['date'][:10],
						starttime=event['start']['date'][11:][:5],
						endtime=event['end']['date'][11:][:5],
						event_detail=event['summary'],
						from_data='event',
						gid=event['id']
						)
			eventAdd.user = user
			db.session.add(eventAdd)
			db.session.commit()

		else:
			eventAdd = Event(
				date=event['start']['dateTime'][:10],
				starttime=event['start']['dateTime'][11:][:5],
				endtime=event['end']['dateTime'][11:][:5],
				event_detail=event['summary'],
				from_data='event',
				gid=event['id']
				)
			eventAdd.user = user
			db.session.add(eventAdd)
			db.session.commit()
		
