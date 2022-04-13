from app.models import db, Picture

from datetime import date

today = date.today()

def seed_pics():
    first_pic = Picture(
        user_id = 1,
        content = "Punctuation superheroes!",
        image = "https://media.istockphoto.com/photos/conceptual-2-letter-exclamation-mark-and-question-mark-by-handwriting-picture-id1321914943?s=612x612",
        created_at = today.strftime("%B %d, %Y"),
        updated_at = today.strftime("%B %d, %Y")
    )

    db.session.add(first_pic)

    db.session.commit()

def undo_pics():
    db.session.execute('TRUNCATE pictures RESTART IDENTITY CASCADE;')
    db.session.commit()
