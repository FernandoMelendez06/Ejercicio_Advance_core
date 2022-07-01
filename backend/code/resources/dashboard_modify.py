from flask_restful import Resource, reqparse
from flask_jwt import jwt_required
from models.user import UserModel
from datetime import datetime
import pytz


class Dashboard_User_Modify(Resource):

    

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



    parser.add_argument('email',
                        type=str,
                        required=True,
                        help="Este campo no puede estar en blanco"
                        )
 


    def put(self):
        
        data = Dashboard_User_Modify.parser.parse_args()
        user = UserModel.find_by_username( data[ 'username' ] )

        if user is not None and user.deleted == False:
        
            user.email = data ['email']
            user.password = data ['password']       
            user.modified_at = datetime.now ( pytz.timezone ( 'UTC'))
            user.save_to_db()
            mensaje = user.json()
            mensaje.update( {"message": "se han actualizado los valores correctamente"} )
            return mensaje,201
        return {"message": "No se encontro el usuario o esta deshabilitado "}, 404  #buscar el codigo https que es

