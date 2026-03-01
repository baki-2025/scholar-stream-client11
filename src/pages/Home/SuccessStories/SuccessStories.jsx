import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const SuccessStories = () => {
  const axiosSecure = useAxiosSecure();
  const [students, setStudents] = useState([]);

  useEffect(() => {
    axiosSecure
      .get("/users?role=student")
      .then((res) => setStudents(res.data))
      .catch((error) => console.error(error));
  }, [axiosSecure]);

  return (
    <section className="bg-blue-200 py-14 px-4">
      <h2 className="text-3xl font-bold text-pink-500 text-center mb-8">
        Student Success Stories
      </h2>

      <div className="max-w-4xl mx-auto">
        <Swiper
          modules={[Autoplay, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 2500 }}
          pagination={{ clickable: true }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {students.map((student) => (
            <SwiperSlide key={student._id}>
              <div className="card bg-green-400 shadow-xl">
                <div className="card-body items-center text-center">
                  <img
                    src={student.photoURL || "/default-user.png"}
                    alt={student.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <p className="mt-4 italic">
                    “ScholarStream helped me achieve my dream scholarship.”
                  </p>
                  <h4 className="font-semibold mt-3">
                    — {student.name}
                  </h4>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default SuccessStories;