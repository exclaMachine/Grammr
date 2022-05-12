from flask import Blueprint, request
from app.models import db, Comment, Comment
from flask_login import current_user, login_required
from app.s3_funcs import (
    upload_file_to_s3, allowed_file, get_unique_filename)

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/new', methods=["POST"])
@login_required
def post_comment():

    user_id=current_user.id
    comment = request.json['comment']
    # print('comment', comment)
    picture_id = request.json['picture_id']

    new_comment = Comment(
        user_id=user_id,
        comment=comment,
        picture_id=picture_id
    )

    #I think this isn't working because the state is already a '' so it's not rerendering
    if len(comment) == 0:
        return {'errors': "Comment must be at least one character"}

    if len(comment) > 255:
        return {'errors': "Comment cannot be longer than 255 characters"}

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


@comment_routes.route('/<int:id>', methods=['DELETE'])
def delete(id):
    # print('routID', id)
    deletedComment = Comment.query.filter(Comment.id == id).first()
    # print('delComm', deletedComment)
    Comment.query.filter(Comment.id == id).delete()
    db.session.commit()
    # print('\n\n\n\ndeletedCommTo dic!!!!!\n\n\n\n', deletedComment.to_dict())
    return deletedComment.to_dict()
