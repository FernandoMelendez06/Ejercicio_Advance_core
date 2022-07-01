
from flask_restful import Resource,reqparse
from models.user import UserModel
from db import db
from datetime import datetime

class UserRegister(Resource):

   
    parser = reqparse.RequestParser()

    parser.add_argument('username',
                        type=str,
                        required=True,
                        help="Este campo no puede estar en blanco"
                        )

    parser.add_argument('password',
                        type=str,
                        required=True,
                        help="Este campo no puede estar en blanco"
                        )

    parser.add_argument('email',
                        type=str,
                        required=True,
                        help="Este campo no puede estar en blanco"
                        )

 
    def post(self):
        
        data = UserRegister.parser.parse_args()

        if UserModel.find_by_username( data ['username'] ):

            if UserModel.find_by_deleted ( data ['username'] ):

                respuesta = {

                    'ok': False,
                    'msg':"Este usuario esta inhabiltado, comuniquese con el administrador"
                }

                return respuesta, 400  

            respuesta = {
                    'ok': False,
                    'msg': "El usuario con ese nombre ya existe"
                }

            return respuesta, 400
        
        
        user = UserModel(**data) 
        user.save_to_db()
        
  
        respuesta = { 'ok': True,
                      'msg': 'Usuario creado satisfactoriamente',
                      'uid':user.id,
                      'username': user.username,
                      'email': user.email
                    }

        return respuesta, 201

