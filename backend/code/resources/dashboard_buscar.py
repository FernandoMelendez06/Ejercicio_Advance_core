from flask_restful import Resource, reqparse
from flask_jwt import jwt_required
from models.user import UserModel
from datetime import datetime
import pytz


class Dashboard_User_Find(Resource):

    @jwt_required()
    def get(self,username):

        user = UserModel.find_by_username ( username )
        if user is not None and user.deleted == False:
            return user.json()   
        return {'msg': 'No se encontro ese usuario o esta deshabilitado'},404

class Dashboard_User_Find_login(Resource):

    def get(self,username):

        user = UserModel.find_by_username ( username )
        if user is not None and user.deleted == False:
            respuesta = {
                'ok': True
            }
            return respuesta,200
        else:
            respuesta = {
                'ok': False,
                'msg': 'No se encontro ese usuario o esta deshabilitado'
            }
            return respuesta,404 


class UserList(Resource):
    @jwt_required()
    def get(self):
        return{'user':[user.json() for user in UserModel.query.all()]}