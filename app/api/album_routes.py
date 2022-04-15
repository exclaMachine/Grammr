from flask import Blueprint, request, jsonify
from app.models import db, Album
from flask_login import current_user, login_required
from app.s3_funcs import (
    upload_file_to_s3, allowed_file, get_unique_filename)

album_routes = Blueprint('albums', __name__)

@album_routes.route('')
def get_albums():
    # print('in the route')
    # albums = Album.query.order_by(Album.id.desc()).all()
    albums = Album.query.all()
    # return {'albums': [album.to_dict() for album in albums]}
    return {
        album.id: album.to_dict() for album in albums
    }

@album_routes.route("/new", methods=["POST"])
@login_required
def post_album():
    # some = request.form.get('title')
    user_id=current_user.id
    title = request.json['title']
    print('\n\ntitle!!!\n\n', title)

    new_album = Album(
        user_id=user_id,
        title=title
    )

    db.session.add(new_album)
    db.session.commit()

    return new_album.to_dict()


# @album_routes.route('/<int:id>', methods=['GET'])
# def get_pic(id):
#     singlePic = Picture.query.filter(Picture.id == id).first()
#     return {
#         singlePic.to_dict()
#     }

# @album_routes.route('/<int:id>', methods=['DELETE'])
# def delete(id):
#     # print('routID', id)
#     deletedPic = Picture.query.filter(Picture.id == id).first()
#     # print('delPIc', deletedPic)
#     Picture.query.filter(Picture.id == id).delete()
#     db.session.commit()
#     # print('\n\n\n\ndeletedPicTo dic!!!!!\n\n\n\n', deletedPic.to_dict())
#     return {
#         'deleted_pic': deletedPic.to_dict()
#     }

# @album_routes.route('/<int:id>', methods=['PUT'])
# def update(id):
#     # print('\n\nid\n\n', id)
#     foundPic = Picture.query.get(id)
#     # foundPic = Picture.query.filter(Picture.id == id)
#     # print('\n\nFOUND!!!!!\n\n', foundPic)
#     # print('\n\nrequest.body\n\n', request)
#     # updated = foundPic.update(request)
#     user_id = request.json['user_id']
#     album_id = request.json['album_id']
#     content = request.json['content']
#     image = request.json['image']

#     foundPic.user_id = user_id
#     foundPic.album_id = album_id
#     foundPic.content = content
#     foundPic.image = image

#     # print('\n\ncontent\n\n', foundPic.image)

#     db.session.add(foundPic)

#     db.session.commit()

#     return {
#         'updated_pic': foundPic.to_dict()
#     }
