from app.models import db, Comment
from datetime import date

today = date.today()

comments_dict = [
    {
        "user_id": 3,
        "picId": 5,
        'comment': 'Comma Chameleon is my favorite. Oxford comma for life!',
        "created": today.strftime("%B %d, %Y"),
        "updated": today.strftime("%B %d, %Y")
    },
    {
        "user_id": 2,
        "picId": 13,
        'comment': 'Isn\'t yeah a great ambigram. I also think dot and top is also a pretty good one.',
        "created": today.strftime("%B %d, %Y"),
        "updated": today.strftime("%B %d, %Y")
    },
    {
        "user_id": 3,
        "picId": 13,
        'comment': 'Two of the greatest ambigram artists: Scott Kim and John Langdon',
        "created": today.strftime("%B %d, %Y"),
        "updated": today.strftime("%B %d, %Y")
    },
    {
        "user_id": 2,
        "picId": 7,
        'comment': 'Semordnilap is palindrome backwards and was coined by Martin Gardner',
        "created": today.strftime("%B %d, %Y"),
        "updated": today.strftime("%B %d, %Y")
    },
    {
        "user_id": 3,
        "picId": 7,
        'comment': 'Another good semordnilap: pots',
        "created": today.strftime("%B %d, %Y"),
        "updated": today.strftime("%B %d, %Y")
    },

]

def seed_comments():


    comments = [Comment(
         user_id = ele['user_id'],
         picture_id = ele['picId'],
         comment = ele['comment'],
         created_at = ele["created"],
        updated_at = ele["updated"]
    ) for ele in comments_dict]

    db.session.add_all(comments)

    db.session.commit()

def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
