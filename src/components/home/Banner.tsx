const Banner = () => {
  return (
    <div>
      <div>
        <img
          className="w-full h-60 absolute object-cover left-0 right-0 m-0 mr-auto ml-auto z-10"
          alt="Una persona vestida con ropa de verano está sentada en un sofá en una sala de estar espaciosa. Está mirando por la ventana y tiene un libro en una mano y una taza en la otra. Los grandes ventanales del salón ofrecen una vista marítima, con el mar al fondo y palmeras en primer plano."
          src="https://q-xx.bstatic.com/xdata/images/xphoto/2880x868/363658458.jpeg?k=427a5cc2522eb3d80a76d232939725ec6cf76e03ef26ee846375709b3e9caf6f&amp;o="
        ></img>
      </div>
      <div className="z-30 max-w-screen-lg min-h-60 m-0 ml-auto mr-auto relative flex px-1 py-12">
        <div className="mt-auto mb-auto m-0">
          <header className="text-white">
            <h1 className="flex flex-col font-extrabold text-5xl">
              <span>{'Siéntete como en casa'}</span>
              <span>{'en tu próxima aventura'}</span>
            </h1>
            <p className="mt-1">
              {'Disfruta de un alojamiento entero para ti'}
            </p>
          </header>
        </div>
      </div>
    </div>
  );
};

export default Banner;
