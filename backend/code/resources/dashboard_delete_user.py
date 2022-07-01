from flask_restful import Resource, reqparse
from flask_jwt import jwt_required, JWT
from models.user import UserModel
from datetime import datetime
import pytz


class Dashboard_User_Delete (Resource):

    

    parser = reqparse.RequestParser() #para inicializar el analizador 

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


    @jwt_required()
    def delete(self):

        data = Dashboard_User_Delete.parser.parse_args()
        user = UserModel.find_by_username( data['username'] )

        if data['password'] == 'order66':

            if user is not None and user.deleted == False:

                user.deleted = True
                user.modified_at = datetime.now ( pytz.timezone ('UTC'))
                user.save_to_db()
                mensaje = user.json()
                mensaje.update( {"message": "se ha borrado este usuario correctamente"} )
                return mensaje,201
            return {"message": "No se encontro el usuario o ya esta deshabilitado"}, 404
        return {"message": "No dijiste la palabra magica"}



    
