from flask import Blueprint, request
from app.models import db, Picture

picture_routes = Blueprint('pictures', __name__)

@picture_routes.route('')
def getPictures():
    pictures = Picture.query.all()
    return {'pictures': [picture.to_dict() for picture in pictures]}
