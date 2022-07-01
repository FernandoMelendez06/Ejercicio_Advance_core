
from db import db
from sqlalchemy import Column, DateTime
from datetime import datetime

class UserModel(db.Model):

    __tablename__ = 'usuarios'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80))
    password = db.Column(db.String(80))
    email = db.Column (db.String ( 50 ))
    created_at = db.Column (  DateTime(timezone=True), default=datetime.utcnow())
    modified_at = db.Column (  DateTime(timezone=True), default=datetime.utcnow())
    deleted = db.Column (db.Boolean, default=False, nullable=False)


    def __init__(self, username, password, email ): 
       
        self.username = username
        self.password = password
        self.email = email
    

    def json(self):  #me crea un formato json del objecto
        return {'id': self.id, 'username': self.username, 'email':self.email, 'Deshabilitado':self.deleted, 'Creado':self.created_at.isoformat() , 'Modificacion':self.modified_at.isoformat(), 'img':'https://bootdey.com/img/Content/avatar/avatar5.png'  }  # 'Creado':self.created_at, 'Modificacion':self.modified_at  


    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
        
    @classmethod
    def find_by_username(cls, username):
        return cls.query.filter_by(username=username).first()

    @classmethod
    def find_by_deleted(cls, deleted):
        return cls.query.filter_by( deleted = True).first()

    @classmethod
    def find_by_id(cls, _id):
        return cls.query.filter_by(id =_id).first()

    
   