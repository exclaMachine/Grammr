from app.models import db, Album
from datetime import date

today = date.today()

def seed_albums():
    first_album = Album(
        user_id = 1,
        title = 'Superheroes',
        created_at = today.strftime("%B %d, %Y"),
        updated_at = today.strftime("%B %d, %Y")
    )

    db.session.add(first_album)

    db.session.commit()

def undo_pics():
    db.session.execute('TRUNCATE albums RESTART IDENTITY CASCADE;')
    db.session.commit()
