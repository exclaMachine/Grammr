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
        #this needs the = can't just list user_id like javascript
        user_id=user_id,
        title=title
    )

    db.session.add(new_album)
    db.session.commit()

    return new_album.to_dict()


# @album_routes.route('/<int:id>', methods=['GET'])
# def get_pic(id):
#     singlePic = Album.query.filter(Album.id == id).first()
#     return {
#         singlePic.to_dict()
#     }

@album_routes.route('/<int:id>', methods=['DELETE'])
def delete(id):
    # print('routID', id)
    deletedAlbum = Album.query.filter(Album.id == id).first()
    # print('delPIc', deletedAlbum)
    Album.query.filter(Album.id == id).delete()
    db.session.commit()
    # print('\n\n\n\ndeletedPicTo dic!!!!!\n\n\n\n', deletedAlbum.to_dict())
    return deletedAlbum.to_dict()


@album_routes.route('/<int:id>', methods=['PUT'])
def update_album(id):
    # print('\n\nid\n\n', id)
    foundAlbum = Album.query.get(id)
    #
    user_id = request.json['user_id']
    title = request.json['title']

    foundAlbum.user_id = user_id
    foundAlbum.title = title

    # print('\n\ncontent\n\n', foundAlbum.image)

    db.session.add(foundAlbum)

    db.session.commit()

    return foundAlbum.to_dict()