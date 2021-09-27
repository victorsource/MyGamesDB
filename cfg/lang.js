const front = {
  index: 'Inicio',
  title: 'My Games DB',
  forms: {
    buttons: {
      new: 'Enviar',
      edit: 'Editar',
      delete: 'Borrar',
      reset: 'Reset',
      accept: 'Aceptar',
      cancel: 'Cancelar',
      select_image: 'Seleccionar Imagen',
      search: 'Buscar',
    },
    name: 'Nombre',
    alt_name: 'Nombres alternativos',
    cover: 'Portada',
    description: 'Descripción',
    comments: 'Comentarios',
  },
  admin: {
    stats: 'Estadísticas',
    general: 'General',
    index: 'Principal',
    admin: 'Administración',
    games: 'Juegos',
    add_game: 'Añadir juego',
    edit_game: 'Editar juego',
    platforms: 'Plataformas',
    add_edit_platform: 'Añadir/Editar plataforma',
    genres: 'Géneros',
    add_edit_genre: 'Añadir/Editar genero',
    developers: 'Desarrolladores',
    add_edit_developer: 'Añadir/Editar desarrollador',
    franchises: 'Franquicia',
    add_edit_franchise: 'Añadir/Editar franquicia',
  },
  table: {
    id: 'ID',
    latest: 'Últimos añadidos',
    title: 'Titulo',
    platform: 'Plataformas',
    genre: 'Géneros',
    launch_date: 'Fecha de lanzamiento',
    developer: 'Desarrolladores',
    japan: 'Japón',
    europe: 'Europa',
    america: 'Norte América',
    actions: 'Acciones'
  },
};
const back = {
  devs: {
    title: 'Desarrolladores',
    form_error: {
      duplicated: 'Desarrollador ya existe',
    },
  },
  franchise: {
    title: 'Franquicias',
    form_error: {
      duplicated: 'Franquicia ya existe',
    },
  },
  genre: {
    title: 'Géneros',
    form_error: {
      duplicated: 'Genero ya existe',
    },
  },
  platform: {
    title: 'Plataformas',
    form_error: {
      duplicated: 'Plataforma ya existe',
    },
  },  
  game: {
    games: 'Juegos',
    title: 'Añadir Juego',
    edit_page: 'Editar Juego',
    form_error: {
      duplicated: 'Juego ya existe',
      img_type: 'Imágenes solo en jpg',
    },
  },
};

module.exports = { front, back };
