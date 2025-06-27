import Swal from "sweetalert2";
import { useTheme } from "../hooks/use-theme";

const Newsletter = () => {
  const { theme } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    try {
      const response = await fetch("https://roommate-finder-server-kappa.vercel.app/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Thank you for subscribing!",
          text: "You have been added to our newsletter.",
          confirmButtonColor: "#3289c9",
        });
        e.target.reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong. Please try again later.",
          confirmButtonColor: "#3289c9",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Network error. Please try again later.",
        confirmButtonColor: "#3289c9",
      });
    }
  };

  return (
    <section
      className={`rounded-xl shadow-md p-8 max-w-7xl mx-auto my-10 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white"
      }`}
    >
      <h2 className="text-2xl font-bold mb-4 text-[#3289c9] text-center">
        Subscribe to our Newsletter
      </h2>
      <p
        className={`mb-6 text-center ${
          theme === "dark" ? "text-gray-300" : "text-gray-600"
        }`}
      >
        Stay updated with the latest roommate listings and tips!
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          className={`border rounded-md px-4 py-2 focus:outline-none focus:border-[#3289c9] transition-colors ${
            theme === "dark"
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
          }`}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          className={`border rounded-md px-4 py-2 focus:outline-none focus:border-[#3289c9] transition-colors ${
            theme === "dark"
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
          }`}
          required
        />
        <button
          type="submit"
          className="bg-[#3289c9] hover:bg-[#2778b5] text-white font-semibold rounded-md py-2 transition-colors"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default Newsletter;
