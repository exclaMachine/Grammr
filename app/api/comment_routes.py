from flask import Blueprint, request
from app.models import db, Picture, Comment
from flask_login import current_user, login_required
from app.s3_funcs import (
    upload_file_to_s3, allowed_file, get_unique_filename)

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/new', methods=["POST"])
@login_required
def post_picture():

    user_id=current_user.id
    comment = request.json['comment']
    picture_id = request.json['picture_id']

    new_comment = Comment(
        user_id=user_id,
        comment=comment,
        picture_id=picture_id
    )

    db.session.add(new_comment)
    db.session.commit()

    return new_comment.to_dict()

@comment_routes.route('/<int:id>', methods=['PUT'])
def update_comment(id):
    # print('\n\nid\n\n', id)
    #get all the albums except the one being changed
    comments = Comment.query.filter(Comment.id != id)

    foundComment = Comment.query.get(id)

    user_id = request.json['user_id']
    print('user_id in back', user_id)
    comment = request.json['comment']
    picture_id = request.json['picture_id']
    print('\n\ncomment\n\n', foundComment)

    if len(comment) > 250:
        return {"errors": "Comment comment must be less than 250 characters in length"}

    foundComment.user_id = user_id
    foundComment.comment = comment
    foundComment.picture_id = picture_id


    db.session.add(foundComment)

    db.session.commit()

    return foundComment.to_dict()
