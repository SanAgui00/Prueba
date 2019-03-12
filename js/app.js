jQuery(document)
		.ready(
				function() {
					jQuery(".confirm").on("click", function() {
						return confirm("delete");
					});
					$(function() {
						$(".bienvenido").typed({
							strings : [ "Bienvenido a <b>SILFAC</b>." ],
							typeSpeed : 20,
							backDelay : 1000,
							loop : false,
							loopCount : true,
							startDelay : 900
						});
					});
					window.sr = ScrollReveal();
					var once = {
						delay : 50,
						origin : 'left',
						scale : 1,
						duration : 800
					};
					var delay = {
						delay : 150,
						origin : 'left',
						scale : 1,
						duration : 900
					};
					var maxdelay = {
						delay : 1800,
						origin : 'left',
						scale : 1,
						duration : 800
					};
					if (sr.isSupported()) {
						sr.reveal('.reveal', once);
						sr.reveal('.reveal-delay', delay);
						sr.reveal('.reveal-maxdelay', maxdelay);
					}
					;

				
					$('#menu-toggle').on('click', function() {
						$('.sidebar').toggleClass('active');
						if ($('.sidebar').hasClass('active')) {
							$('.ml-sm-auto').removeClass('col-lg-10');
							$('.ml-sm-auto').addClass('col-lg-12');
						} else {
							$('.ml-sm-auto').addClass('col-lg-10');
							$('.ml-sm-auto').removeClass('col-lg-12');
						}
					});

					$('#tabGenerales').collapse('show');
					if ($('#list_Fuentes').val() == '') {
						$('#list_Fuentes_r').addClass('d-none');
					}
					if ($('#list_Servicios').val() == '') {
						$('#list_Servicios_r').addClass('d-none');
					}
					if ($('#list_Grupo_Concepto').val() == '') {
						$('#list_Grupo_Concepto_r').addClass('d-none');
					}
					if ($('#list_Fuentes_Servicios').val() == '') {
						$('#list_Fuentes_Servicios_r').addClass('d-none');
					}
					if ($('#conv_entrada').is(':checked')) {

						$("#select_fuente").prop("disabled", false);
						$("#select_sistema").prop("disabled", true);
						$("#select_fuente").prop("required", true);
						$("#select_sistema").prop("required", false);

					}
					if ($('#checkAjustePorProceso').is(':checked')) {
						$('#ajustePorProceso').val(1);
					} else {
						$('#ajustePorProceso').val(0);
					}
					if ($('#radioFuente').is(':checked')) {
						$('.divflagServicio').addClass("d-none");
						$('.flagServicio').prop("disabled", true);
						$('.flagFuente').prop("disabled", false);
					}
					// PRIMERA OPCION DE SELECTS
					$('#list_Clientes_r')
							.append(
									':	<option value="0">Selecciona una opcion</option>');
					// DISABLE INPUTS
					if ($("#validate_envio").length) {
						var v_envio = $("#validate_envio").val();
					}
					if (v_envio == 'NO') {
						$("#validate_auto_envio").prop("disabled", true);
					} else {
						$("#validate_auto_envio").prop("disabled", false);
					}
					$("#validate_envio").change(function() {
						var v_envio = $("#validate_envio").val();
						if (v_envio == "NO") {
							$("#validate_auto_envio").prop("disabled", true);
						} else {
							$("#validate_auto_envio").prop("disabled", false);
						}
					});
					if ($("#validate_reg_cont").length) {
						var v_reg_cont = $("#validate_reg_cont").val();
					}
					if (v_reg_cont == 'NO') {
						$("#validate_auto_reg_cont").prop("disabled", true);
					} else {
						$("#validate_auto_reg_cont").prop("disabled", false);
					}
					$("#validate_reg_cont").change(
							function() {
								var v_reg_cont = $("#validate_reg_cont").val();
								if (v_reg_cont == "NO") {
									$("#validate_auto_reg_cont").prop(
											"disabled", true);
								} else {
									$("#validate_auto_reg_cont").prop(
											"disabled", false);
								}
							});
					if ($("#validate_periodicidad").length) {
						var v_periodicidad = $("#validate_periodicidad").val();
					}
					if (v_periodicidad !== 'EVE') {
						$("#validate_dias_habiles").prop("disabled", true);
					} else {
						$("#validate_dias_habiles").prop("disabled", false);
					}
					$("#validate_periodicidad")
							.change(
									function() {
										var v_periodicidad = $(
												"#validate_periodicidad").val();
										if (v_periodicidad !== 'EVE') {
											$("#validate_dias_habiles").prop(
													"disabled", true);
											var original = $(
													"#validate_dias_habiles")
													.attr('defaultValue');
											$("#validate_dias_habiles").val(
													original);
										} else {
											$("#validate_dias_habiles").prop(
													"disabled", false);
										}
									});

				});

var globalTimeout = null;
$(".ajax-form")
		.keyup(
				function() {
					var inputName = this.name;
					var requestParam = null;
					var subSelect = null;
					var mainSelect = "#" + inputName + "_r";
					if (globalTimeout != null) {
						clearTimeout(globalTimeout);
					}
					globalTimeout = setTimeout(
							function() {
								globalTimeout = null;
								switch (inputName) {
								case "list_Clientes":
									requestParam = "/list/json/cliente";
									subSelect = "#listaDeClientes"
									break;
								case "list_Fuentes":
									requestParam = "/list/json/fuentes";
									subSelect = "#listaDeFuentes";
									break;
								case "list_Servicios":
									requestParam = "/list/json/servicios";
									subSelect = "#listaDeServicios";
									break;
								case "list_Fuentes_Servicios":
									requestParam = "/list/json/fuentes";
									subSelect = "#listaDeFuentesServicios";
									break;
								case "list_Grupo_Concepto":
									requestParam = "/list/json/grupoConcepto";
									subSelect = "#listaDeGrupoConcepto";
									break;
								default:
									break;
								}
								var path = $("#path").val();
								var lista = $("#" + inputName).val();
								$("#" + inputName).val(
										$("#" + inputName).val().toUpperCase());
								if (lista.length < 1) {
									$(mainSelect).addClass('d-none');
									$(subSelect).removeClass('d-none');
									$(mainSelect).empty();
									$(mainSelect)
											.append(
													':	<option value="0">Selecciona una opcion</option>');
								} else {
									$(mainSelect).removeClass('d-none');
									$(subSelect).addClass('d-none');
									var url = path + requestParam;
									$.ajax({
										url : url,
										data : {
											term : $("#" + inputName).val()
										},
										success : function(data) {
											$(mainSelect).empty();
											$.each(data, function(index,
													element) {
												$(mainSelect).append(
														index,
														':<option value="'
																+ index + '">'
																+ element
																+ '</option>');
											});
										}
									});
								}
							}, 400);
				});

$('#dir_nacional').click(function() {
	if ($('#dir_nacional').is(':checked')) {
		$("#dir_internacional").prop("checked", false);
		$("#dir_cp").prop("disabled", false);
		$("#dir_colonia").prop("disabled", false);
		$("#dir_estado").prop("disabled", false);
		$("#dir_delegacion").prop("disabled", false);

	} else {
		$("#dir_internacional").prop("checked", true);
		$("#dir_cp").prop("disabled", true);
		$("#dir_colonia").prop("disabled", true);
		$("#dir_estado").prop("disabled", true);
		$("#dir_delegacion").prop("disabled", true);
	}
});
$('#dir_internacional').click(function() {
	if ($('#dir_internacional').is(':checked')) {
		$("#dir_nacional").prop("checked", false);
		$("#dir_cp").prop("disabled", true);
		$("#dir_colonia").prop("disabled", true);
		$("#dir_estado").prop("disabled", true);
		$("#dir_delegacion").prop("disabled", true);
	} else {
		$("#dir_nacional").prop("checked", true);
		$("#dir_cp").prop("disabled", false);
		$("#dir_colonia").prop("disabled", false);
		$("#dir_estado").prop("disabled", false);
		$("#dir_delegacion").prop("disabled", false);
	}
});
$('#conv_entrada').click(function() {
	if ($('#conv_entrada').is(':checked')) {
		$("#conv_salida").prop("checked", false);
		$("#select_fuente").prop("disabled", false);
		$("#select_sistema").prop("disabled", true);
		$("#select_fuente").prop("required", true);
		$("#select_sistema").prop("required", false);
	} else {
		$("#conv_salida").prop("checked", true);
		$("#select_fuente").prop("disabled", true);
		$("#select_sistema").prop("disabled", false);
		$("#select_fuente").prop("required", false);
		$("#select_sistema").prop("required", true);
	}
});
$('#conv_salida').click(function() {
	if ($('#conv_salida').is(':checked')) {
		$("#conv_entrada").prop("checked", false);
		$("#select_fuente").prop("disabled", true);
		$("#select_sistema").prop("disabled", false);
		$("#select_fuente").prop("required", false);
		$("#select_sistema").prop("required", true);
	} else {
		$("#conv_entrada").prop("checked", true);
		$("#select_fuente").prop("disabled", false);
		$("#select_sistema").prop("disabled", true);
		$("#select_fuente").prop("required", true);
		$("#select_sistema").prop("required", false);
	}
});
$('#general').collapse('show');
$('.tab-link').click(function() {
	var tab = $(this).attr('aria-controls');
	$('.collapse').collapse('hide');

	if (!$('#mainMenu').is(':visible')) {
		$('#btn-ocultar').click();
	}
	$('#' + tab).on('shown.bs.collapse', function(e) {

		e.preventDefault();
	});

});

$(".just-number").keydown(function(event) {

	if (event.keyCode == 46 || event.keyCode == 8) {

	} else {

		if (event.keyCode < 48 || event.keyCode > 57) {
			event.preventDefault();
		}
	}
});

$(".select_cuentas_contables").change(function() {
	var id = $(this).children(":selected").attr("id");
	$('.input_numero_cuenta').val(id);
});
$('.radio_cobranza').click(function() {
	if ($('#radioFuente').is(':checked')) {
		$('.divflagServicio').addClass("d-none");
		$('.divflagFuente').removeClass("d-none");
		$('.flagServicio').prop("disabled", true);
		$('.flagFuente').prop("disabled", false);
		$('#flag').val(0);
	}

	if ($('#radioServicio').is(':checked')) {
		$('.divflagFuente').addClass("d-none");
		$('.divflagServicio').removeClass("d-none");
		$('.flagServicio').prop("disabled", false);
		$('.flagFuente').prop("disabled", true);
		$('#flag').val(1);
	}

});
$('#checkAjustePorProceso').click(function() {
	if ($('#checkAjustePorProceso').is(':checked')) {
		$('#ajustePorProceso').val(1);
	} else {
		$('#ajustePorProceso').val(0);
	}

});

$(".descripcion_servicio").change(function() {
	var id = $(this).children(":selected").attr("id");
	$('.input_descripcion').val(id);
});

$('#btn-ocultar').click(function() {
	if ($('#mainMenu').is(':visible')) {
		$("#mainMenu").hide();
		$("#btn-ocultar").text('Mostrar');
	} else {
		$("#mainMenu").show();
		$("#btn-ocultar").text('Ocultar');
	}
});
var i = 1;
$('.btnAppendConceptos')
		.click(
				function(e) {

					var cantidad = $('#cantidad').val();
					var unidad = $('#unidad').val();
					var claveUnidad = $('#claveUnidad').val();
					var claveServicio = $('#claveServicio').val();
					var servPart = $('#servPart').val();
					var catIngreso = $('#catIngreso').val();
					var concepto = $('#concepto').val();
					var costoUnitario = $('#costoUnitario').val();
					var importe = $('#importe').val();
					var descuento = $('#descuento').val();
					var impuesto = $('#impuesto').val();
					var factor = $('#factor').val();
					var tasa = $('#tasa').val();
					$('#appendConceptos')
							.append(
'<tr id="tr'+i+'"><input type="hidden"  class="arraySolicitar" value="'+cantidad+','+claveUnidad+','+claveServicio+','+servPart+','+catIngreso+','+concepto+','+costoUnitario+','+importe+','+descuento+','+impuesto+','+factor+','+tasa+'"/>'+ '<td>'+ cantidad+ '</td>'
+ '<td>'+ unidad+ '</td>'+ '<td>'+ claveUnidad+ '</td>'
+ '<td>'+ claveServicio+ '</td>'+ '<td>'+ servPart+ '</td>'
+ '<td>'+ catIngreso+ '</td>'+ '<td>'+ concepto+ '</td>'
+ '<td>'+ costoUnitario+ '</td>'+ '<td>'+ importe+ '</td>'
+ '<td>'+ descuento+ '</td>'+ '<td>'+ impuesto+ '</td>'
+ '<td>'+ factor+ '</td>'+ '<td>'+ tasa+ '</td>'
+ '<td><button type="button" class="btnRemoveConceptos" id="tr'+ i + '">Clic</button></td>'
+ '</tr>');
					i++;
					
					 var a = $(".arraySolicitar").map(function() {

				         return $(this).val();
				     })
				     .get()
				     .join("||");
					 $(".table-hide").removeClass("d-none");
				 console.log(a);

				});

$(document).on('click', '.btnRemoveConceptos', function() {
	var td = $(this).attr('id');
	$("tr").remove("#" + td);
	var a = $(".arraySolicitar").map(function() {
		return $(this).val();
	}).get().join("||");
	
	if (a == "") {

$(".table-hide").addClass("d-none");
	}
	console.log(a);
});

$('#agregarTable').click(function() {
	var cuentaContable=$("#id_cuenta").val();
	var empresa=$("#empresa").val();
	var centroCostos=$("#centroCostos").val();
	if(cuentaContable==""){
		$("#id_cuenta").prop("required",true);
		$('#compro').trigger('click');
	}else if(empresa==""){
		$("#empresa").prop("required",true);
		$('#compro').trigger('click');

	}else if(centroCostos==""){
		$("#centroCostos").prop("required",true);
		$('#compro').trigger('click');		
	}else{
		if (centroCostos=="FIJO") {
			var centroCostos =$("#listaDeCentro").val();
			if($("#listaDeCentro").val()==""){
				$("#listaDeCentro").prop("required",true);
				$('#compro').trigger('click');				
			}else{
				tablePoliza(cuentaContable,empresa,centroCostos);
			}
		}else{
			tablePoliza(cuentaContable,empresa,centroCostos);
		}
	}
});

function tablePoliza(cuentaContable,empresa,centroCostos) {
  	var proyecto=$("#proyecto").val();
	var producto=$("#producto").val();
	var tipo=$("#tipo").val();
	var temporal=$("#temporal").val();
	var descripcion=$("#descripcion").val();
	var desccosto=$("#desccosto").val();
  	if(proyecto==""){
  		proyecto="null";
  	}
  	if(producto==""){
  		producto="null";
  	}
  	if(tipo==""){
  		tipo="null";
  	}
  	if(temporal==""){
  		temporal="null";
  	}
  	if(descripcion==""){
  		descripcion="null";
  	}
  	if(desccosto==""){
  		desccosto="null";
  	}
  	var nFilas = $("#tableBody tr").length+1;
  	$('#tableBody')
		.append(
				':<tr><td>'
						+ nFilas
						+ '</td><td>'
						+ empresa
						+ '</td><td>'
						+ cuentaContable
						+ '</td><td>'
						+  centroCostos
						+'</td><td id="tabletipo">'
						+ tipo
						+'</td><td>'
						+ proyecto
						+'</td><td>'
						+ producto
						+'</td><td>'
						+ temporal
						+'</td><td>'
						+ descripcion
						+'</td><td>'
						+'<div class="form-check"><input class="form-check-input form-check-input-precios position-static d-none" checked="checked" type="checkbox" value="'
						+ nFilas
						+ ','
						+ empresa
						+ ','
						+ cuentaContable
						+ ','
						+ centroCostos
						+ ','
						+ tipo
						+ ','
						+ proyecto
						+ ','
						+ producto
						+ ','
						+ temporal
						+ ','
						+ descripcion
						+ ','
						+ desccosto+'" /></div>'+desccosto);

}

$('.pasar').click(function() { return !$('#origen option:selected').remove().appendTo('#destino'); });  
		$('.quitar').click(function() { return !$('#destino option:selected').remove().appendTo('#origen'); });
		$('.pasartodos').click(function() { $('#origen option').each(function() { $(this).remove().appendTo('#destino'); }); });
		$('.quitartodos').click(function() { $('#destino option').each(function() { $(this).remove().appendTo('#origen'); }); });
		$('.submit').click(function() { $('#destino option').prop('selected', 'selected'); });
$('#comparar').click(function() {
	var variables="";
	$('#tableBody #tabletipo').each(function() {
	  // Obtengo el valor de dicho th
	  var value = $(this).text();
	  // Acá deberías hacer lo que quieras con ese valor obtenido
	  variables+=value+",";
	});
	if(variables.indexOf("C") ==-1 && variables.indexOf("A") ==-1){
		alertify.error('Faltan los Modelos de Cargo y Abono',10); 
	}else if(variables.indexOf("C") ==-1){
		alertify.error('Falta Modelo de Cargo.',10); 
	}else if(variables.indexOf("A") ==-1){
		alertify.error('Falta Modelo de Abono.',10); 
	}else{
		alertify.notify('alv yaa', 'success', 10);
	}
});


$(".form-producto").change(function() {
	if (globalTimeout != null) {
		clearTimeout(globalTimeout);
	}
	globalTimeout = setTimeout(function() {
		if ($(".form-producto").val() == 'FUENTE') {
			$(".form-fuente-cha").removeClass("d-none");
			$(".form-fuente-cha").prop("disabled", false);
			$(".form-servicio-cha").prop("disabled", true);
			$(".form-servicio-cha").addClass("d-none");
		} else if($(".form-producto").val() == 'SER') {
			$(".form-servicio-cha").prop("disabled", false);
			$(".form-servicio-cha").removeClass("d-none");
			$(".form-fuente-cha").addClass("d-none");
			$(".form-fuente-cha").prop("disabled", true);
		} else {
			$(".form-servicio-cha").prop("disabled", true);
			$(".form-servicio-cha").addClass("d-none");
			$(".form-fuente-cha").addClass("d-none");
			$(".form-fuente-cha").prop("disabled", true);
		}
	}, 400);

});



