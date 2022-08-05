//hardcoded variables
const API = "https://picsum.photos/v2/list";
const userName = "Erik Dunlop";
const locationPlace = "San Francisco, California";

//---------------- 1st - create the elements
const body = document.body;
const flexContainer = document.createElement("article");
const header = document.createElement("header");

const swiperSectionContainer = document.createElement("section");
const swiperDivWrapper = document.createElement("div");
const swiperDivPagination = document.createElement("div");
const swiperPrevBtn = document.createElement("div");
const swiperNextBtn = document.createElement("div");

const iconsContainer = document.createElement("aside");
const likeIcon = document.createElement("i");
const commentIcon = document.createElement("i");
const sendIcon = document.createElement("i");

const commentSection = document.createElement("section");
const postDescription = document.createElement("p");
const commentInputBox = document.createElement("nav");
const commentInput = document.createElement("input");
const postBtn = document.createElement("button");

//---------------- 2nd - add all classes
flexContainer.classList.add("flex-container");
header.classList.add("flex-header");
header.innerHTML = `
				<img style="height:50px; width:50px;border-radius:9999px;" src="Ellipse 1.png" />
                <div class="header-info-container">
				    <h3 class="userName">${userName}</h3>
				    <p>${locationPlace}</p>
                </div>
`;

swiperSectionContainer.classList.add("swiper");
swiperDivWrapper.classList.add("swiper-wrapper");
swiperDivPagination.classList.add("swiper-pagination");
swiperPrevBtn.classList.add("swiper-button-prev");
swiperNextBtn.classList.add("swiper-button-next");

iconsContainer.classList.add("icons-container");
likeIcon.classList.add("fa-regular", "fa-heart", "fa-xl");
commentIcon.classList.add(
	"fa-regular",
	"fa-comment",
	"fa-xl",
	"fa-flip-horizontal"
);
sendIcon.classList.add("fa-regular", "fa-paper-plane", "fa-xl");

commentSection.classList.add("comment-section");
commentInputBox.classList.add("comment-input-box");
commentInput.setAttribute("type", "text");
commentInput.setAttribute("id", "commentInput");
commentInput.setAttribute("placeholder", "Comment");
postBtn.setAttribute("id", "postBtn");

postDescription.innerHTML = `<span class="bold-font">${userName}</span> This is the description of the Codebytegram post, checking all the photos are working properly`;
postBtn.innerHTML = `Post`;

//---------------- 3rd - prepending and appending all elements, depending on where do I need them
body.prepend(flexContainer);
flexContainer.prepend(header);
flexContainer.append(swiperSectionContainer);
flexContainer.append(iconsContainer);
swiperSectionContainer.prepend(swiperDivWrapper);

swiperSectionContainer.append(swiperDivPagination);
swiperSectionContainer.append(swiperPrevBtn, swiperNextBtn);
iconsContainer.prepend(likeIcon, commentIcon, sendIcon);
commentSection.prepend(postDescription);
flexContainer.append(commentSection);
flexContainer.append(commentInputBox);
commentInputBox.append(commentInput, postBtn);

//---------------- 4th - adding eventListeners
postBtn.addEventListener("click", () => {
	if (commentInput.value != "") {
		const comment = document.createElement("p");
		comment.innerHTML = `<span class="bold-font">Comment</span> ${commentInput.value}`;
		commentSection.append(comment);
		commentInput.value = "";
	}
});
commentInput.addEventListener("keypress", (e) => {
	if (e.key === "Enter" && commentInput.value != "") {
		const comment = document.createElement("p");
		comment.innerHTML = `<span class="bold-font">Comment</span> ${commentInput.value}`;
		commentSection.append(comment);
		commentInput.value = "";
	}
});
likeIcon.addEventListener("click", () => {
	if (likeIcon.classList.contains("fa-regular")) {
		likeIcon.classList.remove("fa-regular");
		likeIcon.classList.add("bg-red", "fa-solid");
	} else {
		likeIcon.classList.remove("bg-red", "fa-solid");
		likeIcon.classList.add("fa-regular");
	}
});

//---------------- 5th - creating and calling the fetching function
const fetchAndFill = async (urlAPI) => {
	const allData = [];
	try {
		await fetch(`${urlAPI}?limit=4`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				data.forEach((item) => {
					const swiperDivSlide = document.createElement("div");
					swiperDivSlide.classList.add("swiper-slide");
					let img = document.createElement("img");
					img.classList.add("img-size");
					img.src = `${item.download_url}`;
					swiperDivSlide.append(img);
					swiperDivWrapper.append(swiperDivSlide);
					allData.push(swiperDivSlide);
				});

				//---------------- 5.1 - creating the swiper at the end so everything works properly with the needed properties
				const swiper = new Swiper(".swiper", {
					direction: "horizontal",
					loop: false,
					pagination: {
						el: ".swiper-pagination",
					},
					navigation: {
						nextEl: ".swiper-button-next",
						prevEl: ".swiper-button-prev",
					},
					allowTouchMove: false,
				});
			});
	} catch (err) {
		console.log(err);
	}
};

fetchAndFill(API);
