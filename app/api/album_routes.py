from flask import Blueprint, request
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
