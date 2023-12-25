import React from "react";

function Post() {
  return (
    <>
      <div className="w-full md:flex md:mt-5 md:p-5 p-3">
        <div className="h-80 overflow-hidden flex justify-center md:w-1/2 md:p-4 ">
          <img
            src="https://images.unsplash.com/photo-1613835842551-894cdd236160?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="sky-skeeper"
            className="object-contain md:max-h-96 md:max-w-md "
          />
        </div>
        <div className="md:h-80 md:flex-1 overflow-hidden p-3 text-justify md:w-1/2 md:p-4 ">
          <h2 className="text-2xl font-bold mb-2 bg-zinc-200 uppercase">
            Heading lorem10
          </h2>
          <div className="auth mt-2 text-xs flex justify-end text-zinc-700 mb-2">
            <p className="info inline mr-4 text-black font-boldcla">
              Author Name
            </p>
            <time>19-12-2023</time>
          </div>

          <p className="summary text-justify md:text-left">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia
            aspernatur facilis aliquid iusto illo at cumque dolorum, maxime in
            voluptates incidunt doloribus modi vel, fugiat quia dolor inventore
            non? Quos deleniti architecto ducimus saepe id nesciunt aspernatur
            perspiciatis maxime labore repudiandae optio consectetur illum, ipsa
            sunt aut quasi quibusdam veniam.
          </p>
        </div>
      </div>
    </>
  );
}

export default Post;
