from .db import db

class Picture(db.Model):
    __tablename__ = 'pictures'

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    album_id = db.Column(db.Integer, db.ForeignKey("albums.id"), nullable=True)
    content = db.Column(db.String(255), nullable=False)
    image = db.Column(db.String(), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)

    users = db.relationship("User", backref="pictures")
    comments = db.relationship("Comment", backref="pictures", cascade="all, delete", order_by="Comment.created_at")
