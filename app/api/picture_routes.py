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
    # return {'pictures': [picture.to_dict() for picture in pictures]}
    return {
        picture.id: picture.to_dict() for picture in pictures
    }

@picture_routes.route("/new", methods=["POST"])
@login_required
def upload_picture():
    if "image" not in request.files:
        # print("not in request.files!!!!!!!!")
        return {"errors": "image required"}, 400

    # user_id = request.json['user_id']
    pic = request.files["image"]
    # album_id = None
    # content = image.filename

    if not allowed_file(pic.filename):
        # print("file type!!!!!")
        return {"errors": "file type not permitted"}, 400

    picName = pic.filename

    pic.filename = get_unique_filename(pic.filename)

    upload = upload_file_to_s3(pic)

    # print('upload!!!!!!!!', upload)

    if "image" not in upload:
        # print("image not in upload!!!!!!!!")
        # if the dictionary doesn't have a url key
        # it means that there was an error when we tried to upload
        # so we send back that error message
        return upload, 400

    # print('currUser', current_user.id)
    # print('filename!!!!!!!!!!', pic.filename)
    # print('image!!!!!!', pic)

    url = upload["image"]
    # flask_login allows us to get the current user from the request
    new_image = Picture(
        user_id=current_user.id,
        album_id=None,
        content=picName,
        # url=url,
        image=url
        )
    # print("new_image", new_image)
    # print("DictImage!!!!!!", new_image.to_dict())

    db.session.add(new_image)
    db.session.commit()
    return new_image.to_dict()
    # return {"image": url}

@picture_routes.route('/<int:id>', methods=['DELETE'])
def delete(id):
    # print('routID', id)
    deletedPic = Picture.query.filter(Picture.id == id).first()
    # print('delPIc', deletedPic)
    Picture.query.filter(Picture.id == id).delete()
    db.session.commit()
    # print('\n\n\n\ndeletedPicTo dic!!!!!\n\n\n\n', deletedPic.to_dict())
    return {
        'deleted_pic': deletedPic.to_dict()
    }
