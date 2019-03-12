select em.clave_empresa empresa ,em.razon_social  razonSocial ,Upper(d.calle||' Numero '||d.numero_ext) calle ,cp.colonia colonia ,pais.nombre||'. '||e.nombre estado  ,replace(pd.nombre,'_',' ')   fechaDatos ,ru.banco cvBanco
,c.nombre_corto         nmBanco
,n.clave                cvNegocio
,n.descripcion          nmNegocio
,gs.clave               cvGrupoConcepto
,Initcap(gs.descripcion)         nmGrupoConcepto
,ru.servicio            cvServicio
,Initcap(s.descripcion)          nmServicio
,ru.caja                cvCaja
,Initcap(cc.nombre_corto)        nmCaja
,sum(ru.transacciones)       transacciones
,sf.precio_aplicado     precio
,sum(ru.transacciones*sf.precio_aplicado)   importe
,sum(nvl(sf.imp_rebate_mensual,0)*ru.transacciones/(select sum(transacciones) from tbl_sif_rep_bancos where fecha_datos between to_date('22/02/2017','dd/mm/yyyy') and to_date('22/02/2017','dd/mm/yyyy') and banco = ru.banco and servicio = ru.servicio))  descAdicional
,sum((ru.transacciones*sf.precio_aplicado)+(nvl(sf.imp_rebate_mensual,0)*ru.transacciones/(select sum(transacciones) from tbl_sif_rep_bancos where fecha_datos between to_date('22/02/2017','dd/mm/yyyy') and to_date('22/02/2017','dd/mm/yyyy') and banco = ru.banco and servicio = ru.servicio))) totalFactura
,avg((select sum(s1.costo_servicio+nvl(s1.imp_rebate_mensual,0)) from tbl_sif_servicios_facturar s1,tbl_sif_servicios s2,tbl_sif_cat_gpo_ccpt_serv s3
where s1.id_servicio = s2.id_servicios
and s2.id_grupo_concepto = s3.id_grupo 
and s1.fecha_datos between to_date('22/02/2017','dd/mm/yyyy') and to_date('22/02/2017','dd/mm/yyyy')
and s2.id_grupo_concepto = gs.id_grupo
and s1.id_cliente = sf.id_cliente)) totalGrupo
from tbl_sif_rep_bancos ru
,tbl_sif_servicios s
,tbl_sif_cat_clientes c
,tbl_sif_cat_clientes cc
,tbl_sif_fuentes f
,tbl_sif_cat_negocios n
,tbl_sif_cat_gpo_ccpt_serv gs
,tbl_sif_servicios_facturar sf
,tbl_sif_cat_dias_periodo dp
,v_sif_cat_periodos pd
,tbl_sif_cat_empresas em
,tbl_sif_cat_procesos pr
,tbl_sif_cat_domicilios d
,tbl_sif_cat_codigo_postal cp
,tbl_sif_cat_poblaciones p
,tbl_sif_cat_estados e
,tbl_sif_cat_paises pais
where ru.servicio = s.clave
and ru.banco = c.clave_cliente
and ru.caja = cc.clave_cliente
and s.id_fuente = f.id_fuente
and s.id_negocio = n.id_negocio
and s.id_grupo_concepto = gs.id_grupo(+)
and ru.fecha_datos = sf.fecha_datos
and c.id_cliente = sf.id_cliente
and s.id_servicios = sf.id_servicio
and ru.fecha_datos = dp.fecha_referencia
and dp.fecha_referencia between pd.fecha_inicio and pd.fecha_fin
and n.id_proceso = pr.id_proceso
and em.id_empresa = pr.id_empresa 
and em.id_domicilio = d.id_domicilio
and d.id_codigo_postal = cp.id_codigo_postal
and cp.id_poblacion = p.id_poblacion
and p.id_estado = e.id_estado
and e.id_pais = pais.id_pais
and ru.fecha_datos between to_date('22/02/2017','dd/mm/yyyy') and to_date('22/02/2017','dd/mm/yyyy')
and ru.banco = nvl('',ru.banco)
and ru.servicio = nvl('',ru.servicio)
and cc.estatus = 'ACT'
group by em.clave_empresa 
,em.razon_social
,Upper(d.calle||' Numero '||d.numero_ext)
,cp.colonia
,pais.nombre||'. '||e.nombre 
,replace(pd.nombre,'_',' ')
,ru.banco
,c.nombre_corto
,n.clave
,n.descripcion
,gs.clave
,Initcap(gs.descripcion)
,ru.servicio
,Initcap(s.descripcion)
,ru.caja
,Initcap(cc.nombre_corto)
,sf.precio_aplicado
order by n.clave,gs.clave,ru.servicio,ru.caja