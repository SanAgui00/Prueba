<%@ include file="../layout/header.jsp"%>
<%@ include file="../layout/menu.jsp"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<div class="col-md-10 ml-sm-auto col-lg-10 pb-4">
	<div class="card mt-2 general-title">
		<div class="card-body">
			<div class="form-row h-100">
				<div class="form-group col-md-6 auto the-title">
					<c:if test="${not empty editar}">
						<c:forEach items="${editar}" var="editar">
							<c:if test="${event=='edit'}">
								<span class="title">Editando a <c:out
										value="${editar.descripcion}"></c:out></span>
							</c:if>
							<c:if test="${event=='delete'}">
								<span class="title">¿Quiere eliminar a <c:out
										value="${editar.descripcion}"></c:out> ?
								</span>
							</c:if>
						</c:forEach>
					</c:if>
				</div>
				<div class="form-group col-md-6 auto">
					<c:if test="${event=='delete'}">
						<sf:form
							action="${pageContext.request.contextPath}/home/cat/redes/save"
							method="POST" name="insert">
							<c:forEach items="${editar}" var="editar">
								<input name="evento" type="hidden" value="delete" />
								<input name="clave" type="hidden" value="${editar.clave}" />
								<button type="submit" class="btn bg-danger text-white btn-sm float-right ">Eliminar</button>
							</c:forEach>
						</sf:form>
					</c:if>
					<a class="float-right text-secondary"
						href="<c:url value='/home/cat/redes/'/>" role="button">Regresar</a>
				</div>
			</div>
		</div>
	</div>
	<c:if test="${event=='edit' && not empty editar}">
		<sf:form
			action="${pageContext.request.contextPath}/home/cat/redes/save"
			
			method="POST" name="insert">
			<c:forEach items="${editar}" var="editar">
				<input name="evento" type="hidden" value="update" />
				<input name="clave" type="hidden" value="${editar.clave}" />

				<div id="mainMenu" class="show card-body">
						<div class="row">
							<div class="col-sm-6 col-md-6 mt-2 mb-2">
								<input type="hidden" id="path"
									value="${pageContext.request.contextPath}" />
									<div class="form-group row">
									<label class="col-sm-4 col-form-label">Descripcion</label>
									<div class="col-sm-8">
											<input type="text" class="form-control form-control-sm" name="descripcion" value="${editar.descripcion}">
									</div>
								</div>
								<div class="form-group row">
									<label class="col-sm-4 col-form-label">Estatus</label>
									<div class="col-sm-8">
											<select class="form-control form-control-sm" name="estatus">
												<option value="ACT" ${ 'ACT'==editar.estatus ? 'selected="selected"' : ''}>Activo</option>
												<option value="NOA" ${ 'NOA'==editar.estatus ? 'selected="selected"' : ''}>Eliminado</option>
											</select>
									</div>
								</div>
								<div class="form-group row">
									<label class="col-sm-4 col-form-label">Fecha</label>
									<div class="col-sm-8">
											<input type="date" class="form-control form-control-sm" name="fecha_crea"
											value="<fmt:formatDate value="${editar.fecha}" pattern="yyyy-MM-dd"/>">
									</div>
								</div>
							</div>
							<div class="col-sm-6 col-md-6 mt-2 mb-2">
								
								<div class="form-group row">
									<label class="col-sm-4 col-form-label">Usuario</label>
									<div class="col-sm-8">
										<input type="text" class="form-control form-control-sm" name="usuario" value="${editar.usuario}">
									</div>
								</div>
								<div class="form-group row">
									<div class="form-group col-md-12 d-flex flex-row-reverse">
										<button id="btnCon" type="submit"
											class="btn bg-danger text-white btn-sm float-right  mb-1 mt-auto">Guardar</button>
									</div>
								</div>
							</div>
						</div>
					</div>


				
			</c:forEach>
		</sf:form>
	</c:if>
	<c:if test="${event=='new'}">
		<sf:form
			action="${pageContext.request.contextPath}/home/cat/redes/save"
			method="POST" name="insert">
			<input name="evento" type="hidden" value="insert" />
			<div id="mainMenu" class="show card-body">
						<div class="row">
							<div class="col-sm-6 col-md-6 mt-2 mb-2">
								<input type="hidden" id="path"
									value="${pageContext.request.contextPath}" />
								<div class="form-group row">
									<label class="col-sm-4 col-form-label">Clave</label>
									<div class="col-sm-8">
											<input type="text" class="form-control form-control-sm" name="clave">
									</div>
								</div>
								<div class="form-group row">
									<label class="col-sm-4 col-form-label">Estatus</label>
									<div class="col-sm-8">
											<select class="form-control form-control-sm" name="estatus">
													<option value="ACT">Activo</option>
													<option value="NOA">Eliminado</option>
											</select>
									</div>
								</div>
								<div class="form-group row">
									<label class="col-sm-4 col-form-label">Fecha</label>
									<div class="col-sm-8">
											<input type="date" class="form-control form-control-sm" name="fecha_crea">
									</div>
								</div>
							</div>
							<div class="col-sm-6 col-md-6 mt-2 mb-2">
								<div class="form-group row">
									<label class="col-sm-4 col-form-label">Descripcion</label>
									<div class="col-sm-8">
											<input type="text" class="form-control form-control-sm" name="descripcion">
									</div>
								</div>
								<div class="form-group row">
									<label class="col-sm-4 col-form-label">Usuario</label>
									<div class="col-sm-8">
										<input type="text" class="form-control form-control-sm" name="usuario">
									</div>
								</div>
								<div class="form-group row">
									<div class="form-group col-md-12 d-flex flex-row-reverse">
										<button id="btnCon" type="submit"
											class="btn bg-danger text-white btn-sm float-right  mb-1 mt-auto">Guardar</button>
									</div>
								</div>
							</div>
						</div>
					</div>
		</sf:form>
	</c:if>
</div>
<%@ include file="../layout/footer.jsp"%>
