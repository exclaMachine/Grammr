from app.models import db, Album
from datetime import date

today = date.today()

albums_dict = [
    {
        "user_id": 1,
        "title": 'Superheros',
        "created": today.strftime("%B %d, %Y"),
        "updated": today.strftime("%B %d, %Y")
    },
    {
        "user_id": 1,
        "title": 'Typography',
        "created": today.strftime("%B %d, %Y"),
        "updated": today.strftime("%B %d, %Y")
    }
]

def seed_albums():
    # first_album = Album(
    #     user_id = 1,
    #     title = 'Superheroes',
    #     created_at = today.strftime("%B %d, %Y"),
    #     updated_at = today.strftime("%B %d, %Y")
    # )

    # db.session.add(first_album)

    albums = [Album(
         user_id = ele['user_id'],
         title = ele['title'],
         created_at = ele["created"],
        updated_at = ele["updated"]
    ) for ele in albums_dict]

    db.session.add_all(albums)

    db.session.commit()

def undo_albums():
    db.session.execute('TRUNCATE albums RESTART IDENTITY CASCADE;')
    db.session.commit()
