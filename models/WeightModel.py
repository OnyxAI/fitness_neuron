from onyx.extensions import db

class WeightModel(db.Model):
    __tablename__ = 'fitness_weight'

    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String())
    weight = db.Column(db.String())
    date = db.Column(db.String())
