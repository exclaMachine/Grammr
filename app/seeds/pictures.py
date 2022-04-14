from app.models import db, Picture

from datetime import date

today = date.today()

pict_dict = [
    {
        "id": 1,
        "cont": "What!?",
        "img": "https://i0.wp.com/awsymbols.com/wp-content/uploads/2019/05/The_Punctuators_Super-Powered_Punctuation_Page-01-1.png",
        "created": today.strftime("%B %d, %Y"),
        "updated": today.strftime("%B %d, %Y")
    },
    {
        "id": 1,
        "cont": "Ampersand",
        "img": "https://images.unsplash.com/photo-1608536212673-d604ad47eced?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
        "created": today.strftime("%B %d, %Y"),
        "updated": today.strftime("%B %d, %Y")
    },
    {
        "id": 2,
        "cont": "Block Letters",
        "img": "https://images.unsplash.com/reserve/uZYSV4nuQeyq64azfVIn_15130980706_64134efc6e_o.jpg?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhbW1hcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
        "created": today.strftime("%B %d, %Y"),
        "updated": today.strftime("%B %d, %Y")
    },
    {
        "id": 3,
        "cont": "English",
        "img": "https://images.unsplash.com/photo-1543109740-4bdb38fda756?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8Z3JhbW1hcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60",
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
