import { defineStore } from "pinia";

interface Testimonial {
  name: string;
  message: string;
  role: string;
  avatar: string;
  image: string;
}

export const useTestimonialStore = defineStore("testimonial", {
    state: () => ({
      testimonials: <Testimonial[]>[
        {
          name: "カイドウ",
          message: "Drinking sake with food at this restaurant is really delicious. I'll open a shop in Onigashima!",
          role: "Kaidou of the Beasts",
          avatar: "https://res.cloudinary.com/dbonwxmgl/image/upload/v1719120844/gdfgqtutjv2lteatix5d.jpg",
          image: "https://res.cloudinary.com/dbonwxmgl/image/upload/v1731046958/tvgvph7l3cevx45vfam7.png",
        },
        {
          name: "モンキー・Dディー・ガープ",
          message: "I ate chicken at this restaurant before going to deal with Blackbeard.",
          role: "Marine Vice Admiral",
          avatar: "https://res.cloudinary.com/dbonwxmgl/image/upload/v1718817087/z4nt0sdjlvhi3an5nqzz.jpg",
          image: "https://res.cloudinary.com/dbonwxmgl/image/upload/v1731047098/fdy8jq9cozgbnhnugb2m.png",
        },
        {
          name: "ロロノア・ゾロ",
          message: "I got lost and ended up at this restaurant. The chicken here is really delicious. That guy Sanji could definitely make chicken this good too.",
          role: "Pirate Hunter",
          avatar: "https://res.cloudinary.com/dbonwxmgl/image/upload/v1718873734/zkzfapfwda9uglxrlqnr.jpg",
          image: "https://res.cloudinary.com/dbonwxmgl/image/upload/v1731047388/czd8pjot7y2run7jtnol.png",
        },
      ],
    }),
    actions: {
      addTestimonial(testimonial: Testimonial) {
        this.testimonials.push(testimonial);
        this.saveTestimonialsToLocalStorage();
      },
      deleteTestimonial(name: string) {
        if (!this.isDefaultTestimonial(name)) {
          this.testimonials = this.testimonials.filter(t => t.name !== name);
          this.saveTestimonialsToLocalStorage();
        }
      },
      saveTestimonialsToLocalStorage() {
        if (process.client) {
          localStorage.setItem("testimonials", JSON.stringify(this.testimonials));
        }
      },
      loadTestimonialsFromLocalStorage() {
        if (process.client) {
          const storedTestimonials = localStorage.getItem("testimonials");
          if (storedTestimonials) {
            this.testimonials = JSON.parse(storedTestimonials);
          }
        }
      },
      isDefaultTestimonial(name: string) {
        const defaultNames = [
          "カイドウ",
          "モンキー・Dディー・ガープ",
          "ロロノア・ゾロ",
        ];
        return defaultNames.includes(name);
      },
    },
  });
  
