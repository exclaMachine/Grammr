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
    content = request.json['content']

    new_comment = Comment(
        user_id=user_id,
        content=content
    )

    db.session.add(new_comment)
    db.session.commit()

    return new_comment.to_dict()
