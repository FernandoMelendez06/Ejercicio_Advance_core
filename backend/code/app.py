from flask import Flask
from flask_restful import Api
from flask_cors import CORS,cross_origin
from flask_jwt import JWT
from flask_sqlalchemy import SQLAlchemy


from security import authenticate, identity
from resources.user import UserRegister
from resources.dashboard_modify import Dashboard_User_Modify
from resources.dashboard_delete_user import Dashboard_User_Delete
from resources.dashboard_buscar import Dashboard_User_Find,UserList,Dashboard_User_Find_login


from db import db


app = Flask(__name__)
app.config ['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config ['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.secret_key ='Fernando'
api = Api(app)   


CORS ( app = app, resources = { r"*": { "origins" : "*" } }, expose_headers = [ "Content-Type",] )

@app.before_first_request
def create_table():
    db.create_all()

db.init_app(app)
jwt = JWT(app,authenticate,identity) #/auth


api.add_resource( UserRegister, '/auth/register')  #me va permitir registrar usuarios
api.add_resource( Dashboard_User_Modify,'/dashboard/edit/profile')
api.add_resource( Dashboard_User_Delete ,'/dashboard/edit/delete')
api.add_resource( Dashboard_User_Find,'/dashboard/buscar/<string:username>')
api.add_resource( Dashboard_User_Find_login,'/login/buscar/<string:username>')
api.add_resource( UserList,'/dashboard/lista/usuarios')



