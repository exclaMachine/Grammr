from app.models import db, Picture

from datetime import date

today = date.today()

pict_dict = [
    {
        "id": 2,
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
        "id": 1,
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
    },
    {
        "id": 2,
        "cont": "Comma, Comma",
        "img": "https://i0.wp.com/awsymbols.com/wp-content/uploads/2020/06/W052820_1.jpg?w=800&ssl=1",
        "created": today.strftime("%B %d, %Y"),
        "updated": today.strftime("%B %d, %Y")
    },
    {
        "id": 2,
        "cont": "Anagrams",
        "img": "https://i0.wp.com/awsymbols.com/wp-content/uploads/2020/10/A101620_1.jpg?w=800&ssl=1",
        "created": today.strftime("%B %d, %Y"),
        "updated": today.strftime("%B %d, %Y")
    },
    {
        "id": 2,
        "cont": "Semordnilap",
        "img": "https://i0.wp.com/awsymbols.com/wp-content/uploads/2020/10/A101620_2.jpg?w=800&ssl=1",
        "created": today.strftime("%B %d, %Y"),
        "updated": today.strftime("%B %d, %Y")
    },
    {
        "id": 2,
        "cont": "Interjection!",
        "img": "https://i0.wp.com/awsymbols.com/wp-content/uploads/2020/11/0EEB01B4-DCED-4CDD-91F8-A79C6BD819A6.jpeg?w=800&ssl=1",
        "created": today.strftime("%B %d, %Y"),
        "updated": today.strftime("%B %d, %Y")
    },
    {
        "id": 2,
        "cont": "Then vs Than",
        "img": "https://i0.wp.com/awsymbols.com/wp-content/uploads/2020/11/0023B6E8-7C78-4173-86FB-803B1E74BC4D.jpeg?w=800&ssl=1",
        "created": today.strftime("%B %d, %Y"),
        "updated": today.strftime("%B %d, %Y")
    },
    {
        "id": 2,
        "cont": "Apostrophantom",
        "img": "https://i0.wp.com/awsymbols.com/wp-content/uploads/2021/01/1CB03FD4-6498-4A56-B317-E79200132B12.jpeg?w=800&ssl=1",
        "created": today.strftime("%B %d, %Y"),
        "updated": today.strftime("%B %d, %Y")
    },
    {
        "id": 2,
        "cont": "Conjunctions",
        "img": "https://i0.wp.com/awsymbols.com/wp-content/uploads/2021/05/7954F0E2-C272-4B3A-908C-A9334BC69640.jpeg?w=800&ssl=1",
        "created": today.strftime("%B %d, %Y"),
        "updated": today.strftime("%B %d, %Y")
    },
    {
        "id": 2,
        "cont": "etc & et al",
        "img": "https://i0.wp.com/awsymbols.com/wp-content/uploads/2021/10/AFC895C9-E5B9-4025-AAB4-1FB617227009.jpeg?w=800&ssl=1",
        "created": today.strftime("%B %d, %Y"),
        "updated": today.strftime("%B %d, %Y")
    },
    {
        "id": 2,
        "cont": "Ambigrams",
        "img": "https://i0.wp.com/awsymbols.com/wp-content/uploads/2021/10/E6FF6D0B-7D5D-44CA-84E9-787F7833C470.png?w=800&ssl=1",
        "created": today.strftime("%B %d, %Y"),
        "updated": today.strftime("%B %d, %Y")
    },

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
