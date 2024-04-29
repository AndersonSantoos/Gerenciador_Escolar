import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../database/dbConfig';

class Cargo extends Model {
    public cargo_id!: number;
    public funcao!: string;
    public isLeader!: boolean;
}

Cargo.init(
    {
        cargo_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        funcao: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Campo não pode estar vazio' }
            }
        },
        isLeader: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            validate: {
                notEmpty: { msg: 'Campo não pode estar vazio' }
            }
        }
    }, {
        sequelize,
        modelName: 'Cargo',
        tableName: 'Cargo'
});

(async () => {
    try {
        await sequelize.sync();
        console.log('Modelo sincronizado com o banco de dados');
    } catch (error) {
        console.error('Erro ao sincronizar o modelo:', error);
    }
})();

export default Cargo;