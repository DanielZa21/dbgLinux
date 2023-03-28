const rutas = require('express').Router();
const conexion = require('./config/conexion')


//.....................................................................

//-----------------------------------------------------------------------------------SOCIOS

//agregar socios
rutas.post('/', (req, res) => {
const { SOCIO_NOMBRE, SOCIO_APELLIDO_PAT, SOCIO_APELLIDO_MAT, SOCIO_FECHA_INGRESO, SOCIO_MATRICULA,
SOCIO_N_ESTACIONAMIENTO, SOCIO_N_LOCKER, SOCIO_PLAN_DE_PAGO_ID } = req.body;

// Obtener el último ID de la tabla de dirección
  const dirSql = `SELECT MAX(DIRECCION_ID) AS last_id FROM DIRECCION`;
  conexion.query(dirSql, (err, result) => {
    if (err) throw err;

    const lastId = result[0].last_id;
    // Realizar la inserción en la tabla de socios con el último ID de dirección
      let sql = `INSERT INTO SOCIO (SOCIO_NOMBRE, SOCIO_APELLIDO_PAT, SOCIO_APELLIDO_MAT, SOCIO_FECHA_INGRESO,
       SOCIO_MATRICULA, SOCIO_N_ESTACIONAMIENTO, SOCIO_N_LOCKER, SOCIO_DIRECCION_ID, SOCIO_PLAN_DE_PAGO_ID)
                   VALUES ('${SOCIO_NOMBRE}', '${SOCIO_APELLIDO_PAT}', '${SOCIO_APELLIDO_MAT}',
                   '${SOCIO_FECHA_INGRESO}', '${SOCIO_MATRICULA}', '${SOCIO_N_ESTACIONAMIENTO}',
                   '${SOCIO_N_LOCKER}', '${lastId}', '${SOCIO_PLAN_DE_PAGO_ID}')`;
      conexion.query(sql, (err, result) => {
        if (err) throw err;
        res.json({ status: 'Socio agregado' });
      });
  });
});


//get socios
rutas.get('/',(req, res)=>{
    let sql ='select * from SOCIO'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})

// get un socio
rutas.get('/:id',(req, res)=>{
    const {id} = req.params
    let sql ='select * from SOCIO where SOCIO_ID = ?'
    conexion.query(sql,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})


//ELIMINAR socios
rutas.delete('/:id',(req, res)=>{
    const{id} = req.params

    let sql =`delete from SOCIO where SOCIO_ID = '${id}'`
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'socio eliminado'})
        }
    })
});

//modificar socio
rutas.put('/:id',(req, res)=>{
    const{id}=req.params
    const{SOCIO_NOMBRE, SOCIO_APELLIDO_PAT, SOCIO_APELLIDO_MAT, SOCIO_N_ESTACIONAMIENTO, SOCIO_N_LOCKER} = req.body

    let sql = `update SOCIO set
                SOCIO_NOMBRE ='${SOCIO_NOMBRE}',
                SOCIO_APELLIDO_PAT='${SOCIO_APELLIDO_PAT}',
                SOCIO_APELLIDO_MAT='${SOCIO_APELLIDO_MAT}',
                SOCIO_N_ESTACIONAMIENTO='${SOCIO_N_ESTACIONAMIENTO}',
                SOCIO_N_LOCKER='${SOCIO_N_LOCKER}'
                where SOCIO_ID = '${id}'`

    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'equipo modificado'})
        }
    })

})
//--------------------------------------------------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------------------------Direccion

//get direccion
rutas.get('/dir',(req, res)=>{
    let sql ='select * from DIRECCION'
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})

//agregar direccion
rutas.post('/dir',( req, res)=>{
    const{DIRECCION_MUNICIPIO_ALCALDIA, DIRECCION_COLONIA, DIRECCION_CP,DIRECCION_CALLE,DIRECCION_NUM_INT,
             DIRECCION_NUM_EXT,   DIRECCION_ESTADO_ID} = req.body

        let sql = `insert into DIRECCION(DIRECCION_MUNICIPIO_ALCALDIA, DIRECCION_COLONIA, DIRECCION_CP,
         DIRECCION_CALLE, DIRECCION_NUM_INT, DIRECCION_NUM_EXT, DIRECCION_ESTADO_ID)
         values('${DIRECCION_MUNICIPIO_ALCALDIA}','${DIRECCION_COLONIA}', '${DIRECCION_CP}','${DIRECCION_CALLE}',
         '${DIRECCION_NUM_INT}','${DIRECCION_NUM_EXT}','${DIRECCION_ESTADO_ID}')`
        conexion.query(sql, (err, rows, fields)=>{
            if(err) throw err
            else{
                const id_direccion = rows.insertId;
                res.json({status: 'direccion  agregada'})

            }
        })

})


//--------------------------------------------------------------------------------------------------------------------------


//-------------------------------------------------------------------------------------------------------------CLASES

//registrar en clase registradas
rutas.post('/claseRe/:id',(req, res)=>{
    const {id} = req.params
    const{SOCIO_CLASE_CLASE_ID, SOCIO_CLASE_SOCIO_ID} = req.body
    let sql =`insert into SOCIO_CLASE(SOCIO_CLASE_CLASE_ID, SOCIO_CLASE_SOCIO_ID)
    values ('${SOCIO_CLASE_CLASE_ID}','${SOCIO_CLASE_SOCIO_ID}')`
    conexion.query(sql,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//get clases
rutas.get('/clase/:id',(req, res)=>{
    let sql =`select CLASE_ID, ACTIVIDAD_T_CLASE, ENTRENADOR_NOMBRE,ENTRENADOR_APELLIDO_PAT,DIA_DIA,HORA_INICIO,
    HORA_FINAL,ACTIVIDAD_COSTO FROM CLASE JOIN ACTIVIDAD ON ACTIVIDAD.ACTIVIDAD_ID = CLASE.CLASE_ACTIVIDAD_ID
    JOIN ENTRENADOR ON ENTRENADOR.ENTRENADOR_ID = CLASE.CLASE_ENTRENADOR_ID
    JOIN DIA ON DIA.DIA_ID = CLASE.CLASE_DIA_ID JOIN HORA ON HORA.HORA_ID = CLASE.CLASE_HORA_ID`
    conexion.query(sql,(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })

})

//get clase registradas
rutas.get('/claseRe/:id',(req, res)=>{
    const {id} = req.params
    let sql =`select CLASE_ID,ACTIVIDAD_T_CLASE,ENTRENADOR_NOMBRE, ENTRENADOR_APELLIDO_PAT,DIA_DIA,HORA_INICIO,
    HORA_FINAL,ACTIVIDAD_COSTO from SOCIO_CLASE
    JOIN  CLASE ON CLASE.CLASE_ID = SOCIO_CLASE.SOCIO_CLASE_CLASE_ID
    JOIN ACTIVIDAD ON ACTIVIDAD.ACTIVIDAD_ID = CLASE.CLASE_ACTIVIDAD_ID
    JOIN ENTRENADOR ON ENTRENADOR.ENTRENADOR_ID = CLASE.CLASE_ENTRENADOR_ID
    JOIN DIA ON DIA.DIA_ID = CLASE.CLASE_DIA_ID JOIN HORA ON HORA.HORA_ID = CLASE.CLASE_HORA_ID
    where SOCIO_CLASE_SOCIO_ID = ?`
    conexion.query(sql,[id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows)
        }
    })
})

//ELIMINAR clase
rutas.delete('/claseRe/:id',(req, res)=>{
    const{id} = req.params
    const{SOCIO_CLASE_CLASE_ID, SOCIO_CLASE_SOCIO_ID} = req.body

    let sql = `DELETE FROM SOCIO_CLASE WHERE SOCIO_CLASE_SOCIO_ID = '${SOCIO_CLASE_SOCIO_ID}'
    AND SOCIO_CLASE_CLASE_ID = '${SOCIO_CLASE_CLASE_ID}'`;
    conexion.query(sql, (err, rows, fields)=>{
        if(err) throw err
        else{
            res.json({status: 'socio eliminado'})
        }
    })
});


module.exports=rutas;
