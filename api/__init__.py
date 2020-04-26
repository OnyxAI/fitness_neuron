import requests, json
from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from flask_restful import Resource, reqparse

from onyx.extensions import db
from neurons.fitness.models.WeightModel import WeightModel
from onyx.models import to_dict

class Weight(Resource):
    parser = reqparse.RequestParser(bundle_errors=True)
    parser.add_argument('id')
    parser.add_argument('weight')
    parser.add_argument('date')

    @jwt_required
    def get(self):
        try:
            user = get_jwt_identity()

            weights = [to_dict(weight) for weight in WeightModel.query.filter(WeightModel.user.endswith(user['id'])).all()]

            return jsonify(status="success", weights=weights)
        except Exception as e:
            return jsonify(status="error", message="{}".format(e)), 500

    @jwt_required
    def post(self):
        try:
            args = self.parser.parse_args()
            user = get_jwt_identity()

            weight = args['weight']
            date = args['date']

            query = WeightModel(user=user['id'], weight=weight, date=date)

            db.session.add(query)

            db.session.commit()

            return jsonify(status="success")
        except Exception as e:
            print(e)
            return jsonify(status="error", message="{}".format(e)), 500

    @jwt_required
    def put(self):
        try:
            args = self.parser.parse_args()
            user = get_jwt_identity()

            id = args['id']

            query = WeightModel.query.filter_by(user=user['id'], id=id).first()

            db.session.delete(query)

            db.session.commit()

            return jsonify(status="success")
        except Exception as e:
            print(e)
            return jsonify(status="error", message="{}".format(e)), 500
