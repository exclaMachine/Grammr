from app.models import db, Picture

from datetime import date

today = date.today()

pict_dict = [
    {
        "id": 1,
        "cont": "What!?",
        "img": "https://images.unsplash.com/photo-1633613286848-e6f43bbafb8d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        "created": today.strftime("%B %d, %Y"),
        "updated": today.strftime("%B %d, %Y")
    },
    {
        "id": 1,
        "cont": "Ampersand",
        "img": "https://images.unsplash.com/photo-1608536212673-d604ad47eced?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
        "created": today.strftime("%B %d, %Y"),
        "updated": today.strftime("%B %d, %Y")
    }
]

def seed_pics():
    pics = [Picture(
        user_id = ele["id"],
        content = ele["cont"],
        image = ele["img"],
        created_at = ele["created"],
        updated_at = ele["updated"]
    ) for ele in pict_dict]

    db.session.add_all(pics)

    db.session.commit()

def undo_pics():
    db.session.execute('TRUNCATE pictures RESTART IDENTITY CASCADE;')
    db.session.commit()
