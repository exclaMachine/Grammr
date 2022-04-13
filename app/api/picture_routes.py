from flask import Blueprint, request
from app.models import db, Picture
from flask_login import current_user, login_required
from app.s3_funcs import (
    upload_file_to_s3, allowed_file, get_unique_filename)

picture_routes = Blueprint('pictures', __name__)

@picture_routes.route('')
def get_pictures():
    # print('in the route')
    # pictures = Picture.query.order_by(Picture.id.desc()).all()
    pictures = Picture.query.all()
    return {'pictures': [picture.to_dict() for picture in pictures]}

@picture_routes.route("", methods=["POST"])
@login_required
def upload_picture():
    if "image" not in request.files:
        return {"errors": "image required"}, 400

    # user_id = request.json['user_id']
    image = request.files["image"]
    # album_id = None
    # content = image.filename


    if not allowed_file(image.filename):
        return {"errors": "file type not permitted"}, 400

    image.filename = get_unique_filename(image.filename)

    upload = upload_file_to_s3(image)

    if "url" not in upload:
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    url = upload["url"]
    # flask_login allows us to get the current user from the request
    new_image = Picture(user=current_user, url=url)
    db.session.add(new_image)
    db.session.commit()
    return {"url": url}
