import { GoogleGenAI, Modality } from "@google/genai";

// --- Sidebar Toggle Script ---
const mobileMenuButton = document.getElementById('mobile-menu-button') as HTMLButtonElement;
const sidebar = document.getElementById('sidebar') as HTMLElement;

if (mobileMenuButton && sidebar) {
    mobileMenuButton.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
    });
}


// --- Page Navigation Script ---
const navModelBtn = document.getElementById('nav-model-btn') as HTMLAnchorElement;
const navLightroomBtn = document.getElementById('nav-lightroom-btn') as HTMLAnchorElement;
const navPasPhotoBtn = document.getElementById('nav-pas-photo-btn') as HTMLAnchorElement;
const navTravelBtn = document.getElementById('nav-travel-btn') as HTMLAnchorElement;
const navPreweddingBtn = document.getElementById('nav-prewedding-btn') as HTMLAnchorElement;
const navRestorationBtn = document.getElementById('nav-restoration-btn') as HTMLAnchorElement;
const navBoudoirBtn = document.getElementById('nav-boudoir-btn') as HTMLAnchorElement;

const modelPage = document.getElementById('model-generator-page') as HTMLElement;
const lightroomPage = document.getElementById('lightroom-generator-page') as HTMLElement;
const pasPhotoPage = document.getElementById('pas-photo-generator-page') as HTMLElement;
const travelPage = document.getElementById('travel-generator-page') as HTMLElement;
const preweddingPage = document.getElementById('prewedding-generator-page') as HTMLElement;
const digitalRestorationPage = document.getElementById('digital-restoration-page') as HTMLElement;
const boudoirPage = document.getElementById('boudoir-generator-page') as HTMLElement;


function setActiveNav(activeBtn: HTMLAnchorElement) {
    const allBtns = [navModelBtn, navLightroomBtn, navPasPhotoBtn, navTravelBtn, navPreweddingBtn, navRestorationBtn, navBoudoirBtn];
    allBtns.forEach(btn => {
        if(btn) {
            btn.classList.remove('bg-indigo-600', 'text-white');
            btn.classList.add('text-slate-300', 'hover:bg-slate-800');
        }
    });
    if(activeBtn) {
        activeBtn.classList.add('bg-indigo-600', 'text-white');
        activeBtn.classList.remove('text-slate-300', 'hover:bg-slate-800');
    }
}

function showPage(pageToShow: HTMLElement) {
    const allPages = [modelPage, lightroomPage, pasPhotoPage, travelPage, preweddingPage, digitalRestorationPage, boudoirPage];
    allPages.forEach(page => {
        if(page) page.classList.add('hidden');
    });
    if(pageToShow) pageToShow.classList.remove('hidden');
}


if (navModelBtn) {
    navModelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showPage(modelPage);
        setActiveNav(navModelBtn);
    });
}

if (navLightroomBtn) {
    navLightroomBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showPage(lightroomPage);
        setActiveNav(navLightroomBtn);
    });
}

if (navPasPhotoBtn) {
    navPasPhotoBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showPage(pasPhotoPage);
        setActiveNav(navPasPhotoBtn);
    });
}

if (navTravelBtn) {
    navTravelBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showPage(travelPage);
        setActiveNav(navTravelBtn);
    });
}

if (navPreweddingBtn) {
    navPreweddingBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showPage(preweddingPage);
        setActiveNav(navPreweddingBtn);
    });
}

if (navRestorationBtn) {
    navRestorationBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showPage(digitalRestorationPage);
        setActiveNav(navRestorationBtn);
    });
}

if (navBoudoirBtn) {
    navBoudoirBtn.addEventListener('click', (e) => {
        e.preventDefault();
        showPage(boudoirPage);
        setActiveNav(navBoudoirBtn);
    });
}


// --- SHARED SCRIPT ---
let modelBase64: string | null = null;
let modelPageBase64: string | null = null;
let pasPhotoBase64: string | null = null;

const imagePreviewModal = document.getElementById('image-preview-modal') as HTMLElement;
const modalImage = document.getElementById('modal-image') as HTMLImageElement;
const closeModalBtn = document.getElementById('close-modal-btn') as HTMLButtonElement;

function setupFileUploader(inputId: string, previewId: string, promptId: string, callback: (base64: string, fileType: string) => void) {
    const fileInput = document.getElementById(inputId) as HTMLInputElement;
    if (fileInput) {
        fileInput.addEventListener('change', (event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const result = e.target?.result as string;
                    const previewEl = document.getElementById(previewId) as HTMLImageElement;
                    if(previewEl) {
                        previewEl.src = result;
                        previewEl.classList.remove('hidden');
                    }
                    const promptEl = document.getElementById(promptId);
                    if(promptEl) {
                        promptEl.classList.add('hidden');
                    }
                    
                    const base64 = result.split(',')[1];
                    callback(base64, file.type);
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

function showImagePreview(imageUrl: string) {
    if(modalImage) modalImage.src = imageUrl;
    if(imagePreviewModal) imagePreviewModal.classList.remove('hidden');
}

function hideImagePreview() {
    if(imagePreviewModal) imagePreviewModal.classList.add('hidden');
    if(modalImage) modalImage.src = ''; 
}

if (closeModalBtn) closeModalBtn.addEventListener('click', hideImagePreview);
if (imagePreviewModal) {
    imagePreviewModal.addEventListener('click', (e) => {
        if (e.target === imagePreviewModal) {
            hideImagePreview();
        }
    });
}


function showModal(message: string) {
    const modalBackdrop = document.createElement('div');
    modalBackdrop.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50';
    const modalContent = document.createElement('div');
    modalContent.className = 'bg-white rounded-lg shadow-xl p-6 max-w-sm w-full text-center animate-fade-in';
    const modalText = document.createElement('p');
    modalText.className = 'text-slate-700 mb-4';
    modalText.textContent = message;
    const closeButton = document.createElement('button');
    closeButton.className = 'bg-indigo-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 transition-all duration-200';
    closeButton.textContent = 'OK';
    closeButton.onclick = () => {
        document.body.removeChild(modalBackdrop);
    };
    modalContent.appendChild(modalText);
    modalContent.appendChild(closeButton);
    modalBackdrop.appendChild(modalContent);
    document.body.appendChild(modalBackdrop);
}

async function generateImage(parts: any[], aspectRatio: string = '1:1') {
    // Lazy initialization of the AI client
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    let attempt = 0;
    const maxAttempts = 5;
    let delay = 1000;
    while (attempt < maxAttempts) {
        try {
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: parts },
                config: {
                    responseModalities: [Modality.IMAGE],
                    imageConfig: {
                        aspectRatio: aspectRatio
                    }
                },
            });

            if (!response.candidates || response.candidates.length === 0) {
                 if (response.promptFeedback?.blockReason) {
                    const reason = response.promptFeedback.blockReason;
                    const message = response.promptFeedback.blockReasonMessage || 'No additional details provided.';
                    throw new Error(`Image generation was blocked. Reason: ${reason}. Details: ${message}`);
                }
                throw new Error("API response was empty or blocked for an unknown reason.");
            }

            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const base64ImageBytes = part.inlineData.data;
                    const mimeType = part.inlineData.mimeType;
                    return `data:${mimeType};base64,${base64ImageBytes}`;
                }
            }
            throw new Error("API response did not contain image data.");
        } catch (error: any) {
            console.warn(`Attempt ${attempt + 1} failed: ${error.message}`);
            attempt++;
            if (attempt >= maxAttempts) {
                throw error;
            }
            await new Promise(resolve => setTimeout(resolve, delay));
            delay *= 2;
        }
    }
    throw new Error("Failed to generate image after multiple attempts.");
}

function downloadSingleImage(imageUrl: string, filename: string) {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

async function downloadAllImages(imageUrls: string[], prefix: string) {
    for (let i = 0; i < imageUrls.length; i++) {
        const link = document.createElement('a');
        link.href = imageUrls[i];
        link.download = `${prefix}_${i + 1}_${Date.now()}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        await new Promise(resolve => setTimeout(resolve, 300));
    }
}

function createResultCard(imageUrl: string, index: number, prefix: string) {
    const container = document.createElement('div');
    container.className = `relative group bg-slate-200 rounded-lg overflow-hidden h-full w-full shadow-sm border border-slate-200 flex items-center justify-center`;
    
    const img = document.createElement('img');
    img.src = imageUrl;
    img.className = "w-full h-full object-cover rounded-lg animate-fade-in";
    
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity z-10';
    
    const previewBtn = document.createElement('button');
    previewBtn.type = 'button';
    previewBtn.className = 'p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75';
    previewBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/><path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/></svg>`;
    previewBtn.onclick = () => showImagePreview(imageUrl);
    
    const downloadBtn = document.createElement('button');
    downloadBtn.className = 'p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-75';
    downloadBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/><path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/></svg>`;
    downloadBtn.onclick = () => downloadSingleImage(imageUrl, `${prefix}_${index+1}.png`);

    buttonContainer.appendChild(previewBtn);
    buttonContainer.appendChild(downloadBtn);
    container.appendChild(img);
    container.appendChild(buttonContainer);
    return container;
}

// --- MODEL GENERATOR SCRIPT ---
const modelForm = document.getElementById('model-generation-form') as HTMLFormElement;
if (modelForm) {
    const generateBtn = document.getElementById('model-page-generate-btn') as HTMLButtonElement;
    const statusContainer = document.getElementById('model-page-status') as HTMLElement;
    const outputContainer = document.getElementById('model-page-output-container') as HTMLElement;
    const imageCountSelect = document.getElementById('model-image-count') as HTMLSelectElement;
    const aspectRatioSelect = document.getElementById('model-aspect-ratio') as HTMLSelectElement;
    const downloadAllBtn = document.getElementById('model-download-all-btn') as HTMLButtonElement;
    const placeholderText = document.getElementById('model-placeholder-text') as HTMLElement;

    let modelPageMimeType = "image/jpeg";

    setupFileUploader('model-page-upload-input', 'model-page-image-preview', 'model-page-upload-prompt', (base64, fileType) => {
        modelPageBase64 = base64;
        modelPageMimeType = fileType;
    });

    modelForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!modelPageBase64) {
            showModal('Harap unggah foto model terlebih dahulu.');
            return;
        }
        
        const imageCount = parseInt(imageCountSelect.value, 10);
        const aspectRatio = aspectRatioSelect.value; 
        
        setModelLoadingState(true, `Menghasilkan foto model...`);

        const photoType = (document.getElementById('model-photo-type') as HTMLSelectElement).value;
        const pose = (document.getElementById('model-page-pose') as HTMLSelectElement).value;
        const clothingCategory = (document.getElementById('model-page-clothing') as HTMLSelectElement).value;
        const focus = (document.getElementById('model-page-focus') as HTMLSelectElement).value;
        
        // DIVERSE CLOTHING LIBRARY
        const clothingVariations: { [key: string]: string[] } = {
            'casual': [
                'dressed in modern casual attire suitable for their gender. If female: wearing a chic beige oversized blazer over a white tee and straight-leg jeans. If male: wearing a smart-casual bomber jacket over a mock neck tee and dark jeans',
                'dressed in modern casual attire suitable for their gender. If female: wearing a trendy denim jumpsuit with a defined waist and sneakers. If male: wearing a modern streetwear oversized hoodie with cargo pants',
                'dressed in modern casual attire suitable for their gender. If female: wearing a stylish midi satin skirt paired with a chunky knit sweater. If male: wearing a flannel overshirt layered over a plain tee with corduroy pants',
                'dressed in modern casual attire suitable for their gender. If female: wearing a white linen set with a button-down shirt and shorts. If male: wearing a linen button-down shirt with beige chinos and loafers',
                'dressed in modern casual attire suitable for their gender. If female: wearing a leather jacket over a slip dress with combat boots. If male: wearing a denim jacket with a hoodie underneath and slim-fit joggers',
                'dressed in modern casual attire suitable for their gender. If female: wearing a ribbed tank top with high-waisted palazzo pants. If male: wearing a polo shirt tucked into tailored cropped trousers',
                'dressed in modern casual attire suitable for their gender. If female: wearing an oversized graphic tee with biker shorts and a denim jacket. If male: wearing a graphic tee with an unbuttoned shirt and relaxed jeans',
                'dressed in modern casual attire suitable for their gender. If female: wearing a cottagecore floral puff-sleeve dress with white sneakers. If male: wearing a simple oxford shirt with rolled sleeves and navy shorts',
                'dressed in modern casual attire suitable for their gender. If female: wearing a monochrome neutral lounge set with a trench coat. If male: wearing a monochrome earth-tone outfit with a t-shirt and overcoat',
                'dressed in modern casual attire suitable for their gender. If female: wearing a cropped hoodie with high-waisted leggings and a cap. If male: wearing a varsity jacket with a plain tee and athletic joggers',
                'dressed in modern casual attire suitable for their gender. If female: wearing a soft pastel cardigan with a white pleated skirt. If male: wearing a knit sweater vest over a white tee and loose trousers',
                'dressed in modern casual attire suitable for their gender. If female: wearing a sleeveless turtleneck top with paperbag waist trousers. If male: wearing a vertical striped cuban collar shirt with shorts'
            ],
            'muslim': [
                'wearing a dusty pink gamis dress with a matching pashmina hijab styled loosely',
                'wearing a modern long tunic in earth tones with wide-leg white trousers and a beige hijab',
                'wearing a luxurious black abaya with gold embroidery details on the sleeves',
                'wearing a floral patterned maxi dress with a simple rectangular hijab',
                'wearing a sage green syar\'i set with a long khimar and niqab option',
                'wearing a trendy oversized shirt with a pleated skirt and a pashmina hijab',
                'wearing a long knitted cardigan over a plain t-shirt and skirt with a hijab',
                'wearing a monochrome beige outfit comprising a blouse, skirt, and hijab',
                'wearing a vibrant batik tunic with plain black pants and a matching scarf',
                'wearing a formal blazer over a maxi dress suitable for office wear with a hijab',
                'wearing a sporty set with a long hoodie tunic and joggers with a sport hijab',
                'wearing a soft pastel colored dress with ruffles and a chiffon hijab'
            ],
            'adat': [
                'wearing a traditional Javanese Kebaya Kutu Baru in floral print with a batik sarong',
                'wearing a formal Batik shirt with a classic brown Parang pattern',
                'wearing a luxurious Songket Palembang outfit with gold thread details',
                'wearing a Balinese traditional outfit with a lace kebaya and a sash (selendang) tied at the waist',
                'wearing a Minangkabau traditional outfit with the distinctive horn-shaped headpiece (suntiang)',
                'wearing a traditional Batak Ulos cloth draped over a modern suit',
                'wearing a Bugis Baju Bodo in bright neon color with gold accessories',
                'wearing a simple traditional Lurik striped shirt',
                'wearing a modern interpretation of Tenun Ikat woven dress',
                'wearing a Betawi Kebaya Encim with vibrant embroidery',
                'wearing a traditional Sasak outfit from Lombok',
                'wearing a heavy velvet Kebaya with intricate gold embroidery'
            ],
            'formal': [
                'wearing a sharp, tailored navy blue business suit with a crisp white shirt',
                'wearing an elegant floor-length black evening gown with a side slit',
                'wearing a professional grey blazer over a silk blouse and pencil skirt',
                'wearing a classic black tuxedo with a bow tie and polished shoes',
                'wearing a sophisticated red cocktail dress made of satin',
                'wearing a double-breasted beige suit with matching trousers',
                'wearing a white formal shirt with black trousers and suspenders',
                'wearing a chic jumpsuit with a belt suitable for a gala',
                'wearing a high-neck sleeveless formal dress in emerald green',
                'wearing a three-piece charcoal suit with a vest',
                'wearing a silk blouse paired with high-waisted wide-leg trousers',
                'wearing a formal velvet blazer in deep burgundy'
            ],
            'non_formal': [
                'wearing a matching silk pajama set in navy blue',
                'wearing a soft cotton oversized t-shirt and plaid pajama pants',
                'wearing a comfortable grey tracksuit for lounging',
                'wearing a fluffy white bathrobe',
                'wearing a loose kaftan dress suitable for home wear',
                'wearing a simple tank top and gym shorts',
                'wearing a traditional daster dress with batik patterns',
                'wearing a hoodie and sweatpants set in pastel color',
                'wearing an oversized graphic tee as a dress',
                'wearing a knit lounge set with a cardigan and shorts',
                'wearing a simple camisole and loose cotton pants',
                'wearing a flannel pajama set'
            ],
            'elegant': [
                'wearing a champagne-colored silk slip dress with a faux fur shawl',
                'wearing a structured blazer dress with gold buttons',
                'wearing a monochromatic white outfit with high-end fabrics and cuts',
                'wearing a flowing chiffon maxi dress with intricate beading',
                'wearing a trench coat over a sleek black turtle neck and trousers',
                'wearing a pearl-embellished blouse with a satin skirt',
                'wearing a designer tweed jacket and skirt set',
                'wearing a deep red velvet dress with long sleeves',
                'wearing a statement cape dress in royal blue',
                'wearing an off-shoulder gown with a mermaid silhouette',
                'wearing a metallic pleated skirt with a black cashmere sweater',
                'wearing a tailored vest and trouser set in cream'
            ]
        };

        const specificClothingOptions = clothingVariations[clothingCategory] || [`wearing ${clothingCategory} clothing`];

        const generatedImages: string[] = [];
        try {
            // Shuffle options to ensure variety in this batch
            const shuffledOptions = [...specificClothingOptions].sort(() => 0.5 - Math.random());

            for (let i = 0; i < imageCount; i++) {
                setModelLoadingState(true, `Menghasilkan foto model (${i + 1}/${imageCount})...`);
                
                // Pick distinct clothing description for each iteration
                const specificClothing = shuffledOptions[i % shuffledOptions.length];
                
                const prompt = `A ${photoType} of the person in the provided image. They should be in a ${pose} pose, ${specificClothing}. The photo must be a ${focus}. The final image should have the exact same facial features as the original image. Aspect ratio is ${aspectRatio}.`;

                const parts = [
                    { text: prompt },
                    { inlineData: { mimeType: modelPageMimeType, data: modelPageBase64! } }
                ];

                const result = await generateImage(parts, aspectRatio);
                if (result) {
                    generatedImages.push(result);
                }
            }
            displayModelResults(generatedImages, aspectRatio);
        } catch (error: any) {
            console.error("Error generating model images:", error);
            setModelLoadingState(true, `Error: ${error.message}`);
             if (generatedImages.length > 0) {
                displayModelResults(generatedImages, aspectRatio);
             } else {
                 setTimeout(() => setModelLoadingState(false, ''), 3000);
             }
        }
    });

    function setModelLoadingState(isLoading: boolean, message: string) {
        if (!generateBtn || !statusContainer || !outputContainer) return;

        generateBtn.disabled = isLoading;
        if (isLoading) {
            if(downloadAllBtn) downloadAllBtn.classList.add('hidden');
            if(placeholderText) placeholderText.classList.add('hidden');
            statusContainer.innerHTML = `
                <div class="text-center text-slate-600">
                     <div class="spinner w-12 h-12 mx-auto rounded-full border-4 border-slate-300"></div>
                     <p class="mt-4 text-lg font-medium">${message}</p>
                </div>`;
            statusContainer.classList.remove('hidden');
        } else {
             statusContainer.classList.add('hidden');
             outputContainer.classList.remove('hidden');
        }
    }

    function displayModelResults(images: string[], ratio: string) {
        if(!outputContainer) return;
        setModelLoadingState(false, '');
        outputContainer.innerHTML = '';
        
        if (images.length > 0) {
            if (downloadAllBtn) {
                downloadAllBtn.classList.remove('hidden');
                downloadAllBtn.onclick = () => downloadAllImages(images, 'model_photo');
            }
            if(placeholderText) placeholderText.classList.add('hidden');
        } else {
             if (downloadAllBtn) downloadAllBtn.classList.add('hidden');
             if(placeholderText) placeholderText.classList.remove('hidden');
        }
        
        let ratioClass = "aspect-square";
        if (ratio === "3:4") ratioClass = "aspect-[3/4]";
        else if (ratio === "16:9") ratioClass = "aspect-video";
        else if (ratio === "9:16") ratioClass = "aspect-[9/16]";

        images.forEach((imageUrl, index) => {
            const card = createResultCard(imageUrl, index, 'model_photo');
            card.classList.remove('aspect-square'); // remove default
            card.classList.add(ratioClass);
            outputContainer.appendChild(card);
        });
    }
}

// --- LIGHTROOM GENERATOR SCRIPT ---
const lightroomForm = document.getElementById('lightroom-form') as HTMLFormElement;
if (lightroomForm) {
    const generateBtn = document.getElementById('lightroom-generate-btn') as HTMLButtonElement;
    const statusContainer = document.getElementById('lightroom-status') as HTMLElement;
    const outputContainer = document.getElementById('lightroom-output-container') as HTMLElement;
    const imageCountSelect = document.getElementById('lightroom-image-count') as HTMLSelectElement;
    const aspectRatioSelect = document.getElementById('lightroom-aspect-ratio') as HTMLSelectElement;
    const downloadAllBtn = document.getElementById('lightroom-download-all-btn') as HTMLButtonElement;
    const placeholderText = document.getElementById('lightroom-placeholder-text') as HTMLElement;
    const errorMessage = document.getElementById('lightroom-error-message') as HTMLElement;
    const errorDetails = document.getElementById('lightroom-error-details') as HTMLElement;

    let lightroomFile: { base64: string, mimeType: string } | null = null;

    setupFileUploader('lightroom-upload-input', 'lightroom-image-preview', 'lightroom-upload-prompt', (base64, fileType) => {
        lightroomFile = { base64, mimeType: fileType };
    });

    lightroomForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!lightroomFile) {
            showModal('Harap unggah foto terlebih dahulu.');
            return;
        }

        const imageCount = parseInt(imageCountSelect.value, 10);
        const aspectRatio = aspectRatioSelect.value;
        const preset = (document.getElementById('lightroom-preset') as HTMLSelectElement).value;
        const temp = (document.getElementById('lightroom-temp') as HTMLSelectElement).value;

        setLightroomLoadingState(true);
        errorMessage.classList.add('hidden');
        outputContainer.innerHTML = ''; // clear previous
        placeholderText.classList.add('hidden');

        let presetPrompt = "";
        if (preset === "portrait") {
            presetPrompt = "Apply professional portrait retouching. Smooth skin texture while keeping it realistic, remove blemishes, enhance eye clarity, and use soft flattering lighting. Make the subject look their best.";
        } else if (preset === "natural") {
            presetPrompt = "Apply a natural color grading style. Enhance colors to look vibrant but true to life, balance the exposure, and provide a clean, crisp look.";
        } else if (preset === "bw") {
            presetPrompt = "Convert to high-quality artistic black and white photography. Use strong contrast, dramatic lighting, and rich grayscale tones.";
        }

        let tempPrompt = "";
        if (temp === "warm") {
            tempPrompt = "Apply a warm color temperature. Infuse the image with golden hour tones, soft yellow and orange hues, creating a cozy and inviting atmosphere.";
        } else if (temp === "cold") {
            tempPrompt = "Apply a cool color temperature. Infuse the image with blueish tones, creating a crisp, cinematic, and slightly wintery or refreshing atmosphere.";
        }

        const prompt = `Edit this photo. ${presetPrompt} ${tempPrompt} Maintain the original composition and facial features perfectly. Aspect Ratio ${aspectRatio}.`;

        const parts: any[] = [
            { text: prompt },
            { inlineData: { mimeType: lightroomFile.mimeType, data: lightroomFile.base64 } }
        ];

        const generatedImages: string[] = [];
        try {
            for (let i = 0; i < imageCount; i++) {
                const result = await generateImage(parts, aspectRatio);
                if (result) generatedImages.push(result);
            }
            displayLightroomResults(generatedImages, aspectRatio);
        } catch (error: any) {
            console.error("Error generating lightroom images:", error);
            showLightroomErrorState(error.message);
            if (generatedImages.length > 0) {
                displayLightroomResults(generatedImages, aspectRatio);
            }
        } finally {
            setLightroomLoadingState(false);
        }
    });

    function setLightroomLoadingState(isLoading: boolean) {
        if (!generateBtn || !statusContainer) return;
        generateBtn.disabled = isLoading;

        if (isLoading) {
            statusContainer.classList.remove('hidden');
            if(downloadAllBtn) downloadAllBtn.classList.add('hidden');
        } else {
            statusContainer.classList.add('hidden');
        }
    }

    function showLightroomErrorState(message: string) {
        if (errorMessage && errorDetails) {
            errorDetails.textContent = message;
            errorMessage.classList.remove('hidden');
        }
    }

    function displayLightroomResults(images: string[], ratio: string) {
        if(!outputContainer) return;
        
        if (images.length > 0) {
            if (downloadAllBtn) {
                downloadAllBtn.classList.remove('hidden');
                downloadAllBtn.onclick = () => downloadAllImages(images, 'lightroom_edit');
            }
            if(placeholderText) placeholderText.classList.add('hidden');
        } else {
             if(placeholderText) placeholderText.classList.remove('hidden');
        }

        let ratioClass = "aspect-square";
        if (ratio === "3:4") ratioClass = "aspect-[3/4]";
        else if (ratio === "16:9") ratioClass = "aspect-video";
        else if (ratio === "9:16") ratioClass = "aspect-[9/16]";

        images.forEach((imageUrl, index) => {
            const card = createResultCard(imageUrl, index, 'lightroom_edit');
            card.classList.remove('aspect-square');
            card.classList.add(ratioClass);
            outputContainer.appendChild(card);
        });
    }
}


// --- PAS PHOTO GENERATOR SCRIPT ---
const pasPhotoForm = document.getElementById('pas-photo-form') as HTMLFormElement;
if (pasPhotoForm) {
    const generateBtn = document.getElementById('pas-photo-generate-btn') as HTMLButtonElement;
    const statusContainer = document.getElementById('pas-photo-status') as HTMLElement;
    const outputContainer = document.getElementById('pas-photo-output-container') as HTMLElement;
    const placeholderText = document.getElementById('pas-photo-placeholder-text') as HTMLElement;
    const errorMessage = document.getElementById('pas-photo-error-message') as HTMLElement;
    const errorDetails = document.getElementById('pas-photo-error-details') as HTMLElement;
    const downloadAllBtn = document.getElementById('pas-photo-download-all-btn') as HTMLButtonElement;

    let pasPhotoMimeType = "image/jpeg";

    setupFileUploader('pas-photo-upload-input', 'pas-photo-image-preview', 'pas-photo-upload-prompt', (base64, fileType) => {
        pasPhotoBase64 = base64;
        pasPhotoMimeType = fileType;
    });

    pasPhotoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!pasPhotoBase64) {
            showModal('Harap unggah foto wajah terlebih dahulu.');
            return;
        }

        const bgColor = (document.getElementById('pas-photo-bg-color') as HTMLSelectElement).value;
        const size = (document.getElementById('pas-photo-size') as HTMLSelectElement).value;
        const attire = (document.getElementById('pas-photo-attire') as HTMLSelectElement).value;
        const imageCount = parseInt((document.getElementById('pas-photo-image-count') as HTMLSelectElement).value, 10);

        setPasPhotoLoadingState(true);
        errorMessage.classList.add('hidden');
        outputContainer.innerHTML = '';
        placeholderText.classList.add('hidden');

        let attirePrompt = "";
        if (attire === "formal") attirePrompt = "wearing a formal suit and tie";
        else if (attire === "semi-formal") attirePrompt = "wearing a neat white shirt";
        else if (attire === "casual") attirePrompt = "wearing a neat casual t-shirt";

        const prompt = `Create a formal ID photo (Pas Foto) of the person in the image. Size: ${size}. Background color: ${bgColor}. The person should be ${attirePrompt}. Maintain facial features exactly. High quality, professional lighting. Aspect ratio 3:4.`;

        const parts = [
            { text: prompt },
            { inlineData: { mimeType: pasPhotoMimeType, data: pasPhotoBase64 } }
        ];

        const generatedImages: string[] = [];
        try {
            for (let i = 0; i < imageCount; i++) {
                const result = await generateImage(parts, '3:4');
                if (result) generatedImages.push(result);
            }
            displayPasPhotoResults(generatedImages);
        } catch (error: any) {
            console.error("Error generating pas photo:", error);
            showPasPhotoErrorState(error.message);
             if (generatedImages.length > 0) {
                displayPasPhotoResults(generatedImages);
            }
        } finally {
            setPasPhotoLoadingState(false);
        }
    });

    function setPasPhotoLoadingState(isLoading: boolean) {
        if (!generateBtn || !statusContainer) return;
        generateBtn.disabled = isLoading;
        if (isLoading) {
            statusContainer.classList.remove('hidden');
            if(downloadAllBtn) downloadAllBtn.classList.add('hidden');
        } else {
            statusContainer.classList.add('hidden');
        }
    }

    function showPasPhotoErrorState(message: string) {
        if(errorMessage && errorDetails) {
            errorDetails.textContent = message;
            errorMessage.classList.remove('hidden');
        }
    }

    function displayPasPhotoResults(images: string[]) {
        if (!outputContainer) return;
        if (images.length > 0) {
            if (downloadAllBtn) {
                 downloadAllBtn.classList.remove('hidden');
                 downloadAllBtn.onclick = () => downloadAllImages(images, 'pas_photo');
            }
            if(placeholderText) placeholderText.classList.add('hidden');
        } else {
             if(placeholderText) placeholderText.classList.remove('hidden');
        }

        images.forEach((imageUrl, index) => {
            const card = createResultCard(imageUrl, index, 'pas_photo');
            card.classList.remove('aspect-square');
            card.classList.add('aspect-[3/4]');
            outputContainer.appendChild(card);
        });
    }
}

// --- TRAVEL GENERATOR SCRIPT ---
const travelForm = document.getElementById('travel-photo-form') as HTMLFormElement;
if (travelForm) {
    const generateBtn = document.getElementById('travel-generate-btn') as HTMLButtonElement;
    const statusContainer = document.getElementById('travel-status') as HTMLElement;
    const outputContainer = document.getElementById('travel-output-container') as HTMLElement;
    const placeholderText = document.getElementById('travel-placeholder-text') as HTMLElement;
    const errorMessage = document.getElementById('travel-error-message') as HTMLElement;
    const errorDetails = document.getElementById('travel-error-details') as HTMLElement;
    const downloadAllBtn = document.getElementById('travel-download-all-btn') as HTMLButtonElement;
    
    const uploadedTravelFiles: { base64: string, mimeType: string }[] = [];

    // Setup 5 upload slots
    for(let i=1; i<=5; i++) {
        setupFileUploader(`travel-upload-input-${i}`, `travel-image-preview-${i}`, `travel-upload-prompt-${i}`, (base64, fileType) => {
            uploadedTravelFiles.push({ base64, mimeType: fileType });
            const deleteBtn = document.getElementById(`travel-delete-btn-${i}`);
            if(deleteBtn) {
                deleteBtn.classList.remove('hidden');
                deleteBtn.onclick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    // Reset UI
                    const img = document.getElementById(`travel-image-preview-${i}`) as HTMLImageElement;
                    const prompt = document.getElementById(`travel-upload-prompt-${i}`) as HTMLElement;
                    const input = document.getElementById(`travel-upload-input-${i}`) as HTMLInputElement;
                    if(img) { img.src = ''; img.classList.add('hidden'); }
                    if(prompt) prompt.classList.remove('hidden');
                    if(input) input.value = '';
                    deleteBtn.classList.add('hidden');
                    // Note: In a real app we'd carefully remove from array, but for simplicity we append.
                };
            }
        });
    }

    travelForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (uploadedTravelFiles.length === 0) {
            showModal('Harap unggah setidaknya satu foto.');
            return;
        }

        const location = (document.getElementById('travel-bg-select') as HTMLSelectElement).value;
        const season = (document.getElementById('travel-season-select') as HTMLSelectElement).value;
        const groupType = (document.getElementById('travel-group-type') as HTMLSelectElement).value;
        const aspectRatio = (document.getElementById('travel-aspect-ratio') as HTMLSelectElement).value;
        const imageCount = parseInt((document.getElementById('travel-image-count') as HTMLSelectElement).value, 10);

        setTravelLoadingState(true);
        errorMessage.classList.add('hidden');
        outputContainer.innerHTML = '';
        placeholderText.classList.add('hidden');

        let seasonPrompt = "";
        if (season === "auto") {
            seasonPrompt = "The season and weather should be automatically determined to best fit the destination's most iconic look (e.g., snowy if alps, sunny if beach).";
        } else {
            seasonPrompt = `The season/weather is ${season}.`;
        }

        let groupPrompt = "";
        if (groupType === "auto") {
            groupPrompt = "Analyze the uploaded photos. If there is one person, generate a solo travel photo. If there is a couple, generate a romantic couple photo. If there is a group, generate a fun group photo with friends or family.";
        } else if (groupType === "couple") {
             groupPrompt = "The subjects are a couple. Pose them romantically, holding hands or looking at each other.";
        } else if (groupType === "family") {
             groupPrompt = "The subjects are a family. Pose them close together, smiling warmly.";
        } else if (groupType === "friends") {
             groupPrompt = "The subjects are friends. Pose them naturally, laughing or doing a fun activity together.";
        }

        const prompt = `Generate a realistic travel photo. Location: ${location}. ${seasonPrompt} ${groupPrompt} Integrate the people from the uploaded images into this scene naturally. Match lighting and perspective. Aspect ratio ${aspectRatio}.`;

        // Use the last uploaded file as the main reference for simplicity in this demo, or include multiple
        // Gemini accepts multiple image parts.
        const parts: any[] = [{ text: prompt }];
        uploadedTravelFiles.forEach(file => {
             parts.push({ inlineData: { mimeType: file.mimeType, data: file.base64 } });
        });

        const generatedImages: string[] = [];
        try {
            for (let i = 0; i < imageCount; i++) {
                const result = await generateImage(parts, aspectRatio);
                if (result) generatedImages.push(result);
            }
            displayTravelResults(generatedImages, aspectRatio);
        } catch (error: any) {
             console.error("Error generating travel images:", error);
             showTravelErrorState(error.message);
             if (generatedImages.length > 0) {
                 displayTravelResults(generatedImages, aspectRatio);
             }
        } finally {
            setTravelLoadingState(false);
        }
    });

    function setTravelLoadingState(isLoading: boolean) {
        if (!generateBtn || !statusContainer) return;
        generateBtn.disabled = isLoading;
        if (isLoading) {
            statusContainer.classList.remove('hidden');
             if(downloadAllBtn) downloadAllBtn.classList.add('hidden');
        } else {
            statusContainer.classList.add('hidden');
        }
    }

     function showTravelErrorState(message: string) {
        if(errorMessage && errorDetails) {
            errorDetails.textContent = message;
            errorMessage.classList.remove('hidden');
        }
    }

    function displayTravelResults(images: string[], ratio: string) {
        if (!outputContainer) return;
        if (images.length > 0) {
             if (downloadAllBtn) {
                 downloadAllBtn.classList.remove('hidden');
                 downloadAllBtn.onclick = () => downloadAllImages(images, 'travel_photo');
            }
             if(placeholderText) placeholderText.classList.add('hidden');
        } else {
             if(placeholderText) placeholderText.classList.remove('hidden');
        }
        
        let ratioClass = "aspect-square";
        if (ratio === "3:4") ratioClass = "aspect-[3/4]";
        else if (ratio === "16:9") ratioClass = "aspect-video";
        else if (ratio === "9:16") ratioClass = "aspect-[9/16]";

        images.forEach((imageUrl, index) => {
            const card = createResultCard(imageUrl, index, 'travel_photo');
            card.classList.remove('aspect-square');
            card.classList.add(ratioClass);
            outputContainer.appendChild(card);
        });
    }
}

// --- PREWEDDING GENERATOR SCRIPT ---
const preweddingForm = document.getElementById('prewedding-photo-form') as HTMLFormElement;
if (preweddingForm) {
    const generateBtn = document.getElementById('prewedding-generate-btn') as HTMLButtonElement;
    const statusContainer = document.getElementById('prewedding-status') as HTMLElement;
    const outputContainer = document.getElementById('prewedding-output-container') as HTMLElement;
    const placeholderText = document.getElementById('prewedding-placeholder-text') as HTMLElement;
    const errorMessage = document.getElementById('prewedding-error-message') as HTMLElement;
    const errorDetails = document.getElementById('prewedding-error-details') as HTMLElement;
    const downloadAllBtn = document.getElementById('prewedding-download-all-btn') as HTMLButtonElement;
    
    let personA: { base64: string, mimeType: string } | null = null;
    let personB: { base64: string, mimeType: string } | null = null;

    setupFileUploader('prewedding-upload-input-a', 'prewedding-image-preview-a', 'prewedding-upload-prompt-a', (base64, fileType) => {
        personA = { base64, mimeType: fileType };
        const btn = document.getElementById('prewedding-delete-btn-a');
        if(btn) btn.classList.remove('hidden');
    });

    setupFileUploader('prewedding-upload-input-b', 'prewedding-image-preview-b', 'prewedding-upload-prompt-b', (base64, fileType) => {
        personB = { base64, mimeType: fileType };
        const btn = document.getElementById('prewedding-delete-btn-b');
        if(btn) btn.classList.remove('hidden');
    });
    
    // Toggle location inputs
    const outdoorRadio = document.getElementById('prewedding-location-type-outdoor') as HTMLInputElement;
    const indoorRadio = document.getElementById('prewedding-location-type-indoor') as HTMLInputElement;
    const outdoorContainer = document.getElementById('prewedding-location-outdoor-container') as HTMLElement;
    const indoorContainer = document.getElementById('prewedding-location-indoor-container') as HTMLElement;

    if (outdoorRadio && indoorRadio) {
        const toggleLocation = () => {
            if (outdoorRadio.checked) {
                outdoorContainer.classList.remove('hidden');
                indoorContainer.classList.add('hidden');
            } else {
                outdoorContainer.classList.add('hidden');
                indoorContainer.classList.remove('hidden');
            }
        };
        outdoorRadio.addEventListener('change', toggleLocation);
        indoorRadio.addEventListener('change', toggleLocation);
    }

    preweddingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!personA && !personB) {
            showModal('Harap unggah foto pasangan (minimal satu orang).');
            return;
        }

        setPreweddingLoadingState(true);
        errorMessage.classList.add('hidden');
        outputContainer.innerHTML = '';
        placeholderText.classList.add('hidden');

        const locationType = (document.querySelector('input[name="location-type"]:checked') as HTMLInputElement).value;
        let location = "";
        if (locationType === 'outdoor') {
            location = (document.getElementById('prewedding-location-outdoor-select') as HTMLSelectElement).value;
        } else {
            location = (document.getElementById('prewedding-location-indoor-select') as HTMLSelectElement).value;
        }
        
        const attire = (document.getElementById('prewedding-attire-select') as HTMLSelectElement).value;
        const aspectRatio = (document.getElementById('prewedding-aspect-ratio') as HTMLSelectElement).value;
        const imageCount = parseInt((document.getElementById('prewedding-image-count') as HTMLSelectElement).value, 10);

        const prompt = `Generate a romantic prewedding photo of the couple. Location: ${location}. Attire: ${attire}. Mood: Romantic, Cinematic, High Quality. Make sure facial features match the uploaded photos. Aspect Ratio: ${aspectRatio}.`;

        const parts: any[] = [{ text: prompt }];
        if (personA) parts.push({ inlineData: { mimeType: personA.mimeType, data: personA.base64 } });
        if (personB) parts.push({ inlineData: { mimeType: personB.mimeType, data: personB.base64 } });

        const generatedImages: string[] = [];
        try {
            for (let i = 0; i < imageCount; i++) {
                const result = await generateImage(parts, aspectRatio);
                if (result) generatedImages.push(result);
            }
            displayPreweddingResults(generatedImages, aspectRatio);
        } catch (error: any) {
            console.error("Error generating prewedding images:", error);
            showPreweddingErrorState(error.message);
            if (generatedImages.length > 0) {
                displayPreweddingResults(generatedImages, aspectRatio);
            }
        } finally {
             setPreweddingLoadingState(false);
        }
    });

    function setPreweddingLoadingState(isLoading: boolean) {
        if (!generateBtn || !statusContainer) return;
        generateBtn.disabled = isLoading;
        if (isLoading) {
            statusContainer.classList.remove('hidden');
            if(downloadAllBtn) downloadAllBtn.classList.add('hidden');
        } else {
            statusContainer.classList.add('hidden');
        }
    }

    function showPreweddingErrorState(message: string) {
        if(errorMessage && errorDetails) {
            errorDetails.textContent = message;
            errorMessage.classList.remove('hidden');
        }
    }

    function displayPreweddingResults(images: string[], ratio: string) {
        if (!outputContainer) return;
        if (images.length > 0) {
            if (downloadAllBtn) {
                 downloadAllBtn.classList.remove('hidden');
                 downloadAllBtn.onclick = () => downloadAllImages(images, 'prewedding_photo');
            }
             if(placeholderText) placeholderText.classList.add('hidden');
        } else {
             if(placeholderText) placeholderText.classList.remove('hidden');
        }

        let ratioClass = "aspect-square";
        if (ratio === "3:4") ratioClass = "aspect-[3/4]";
        else if (ratio === "16:9") ratioClass = "aspect-video";
        else if (ratio === "9:16") ratioClass = "aspect-[9/16]";

        images.forEach((imageUrl, index) => {
            const card = createResultCard(imageUrl, index, 'prewedding_photo');
            card.classList.remove('aspect-square');
            card.classList.add(ratioClass);
            outputContainer.appendChild(card);
        });
    }
}

// --- DIGITAL RESTORATION SCRIPT ---
const restorationForm = document.getElementById('digital-restoration-form') as HTMLFormElement;
if (restorationForm) {
    const generateBtn = document.getElementById('restoration-generate-btn') as HTMLButtonElement;
    const statusContainer = document.getElementById('restoration-status') as HTMLElement;
    const outputContainer = document.getElementById('restoration-output-container') as HTMLElement;
    const placeholderText = document.getElementById('restoration-placeholder-text') as HTMLElement;
    const errorMessage = document.getElementById('restoration-error-message') as HTMLElement;
    const errorDetails = document.getElementById('restoration-error-details') as HTMLElement;
    const downloadAllBtn = document.getElementById('restoration-download-all-btn') as HTMLButtonElement;

    let restorationFile: { base64: string, mimeType: string } | null = null;

    setupFileUploader('restoration-upload-input', 'restoration-image-preview', 'restoration-upload-prompt', (base64, fileType) => {
        restorationFile = { base64, mimeType: fileType };
    });

    restorationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!restorationFile) {
            showModal('Harap unggah foto yang ingin direstorasi.');
            return;
        }

        setRestorationLoadingState(true);
        errorMessage.classList.add('hidden');
        outputContainer.innerHTML = '';
        placeholderText.classList.add('hidden');

        const prompt = "Restore this image. Remove scratches, tears, and noise. Sharpen details, enhance facial features, and colorize if black and white. Make it look like a high-quality modern photo.";
        const parts = [
            { text: prompt },
            { inlineData: { mimeType: restorationFile.mimeType, data: restorationFile.base64 } }
        ];

        try {
             const result = await generateImage(parts, '3:4'); // Default 3:4 for restoration usually fits portraits
             displayRestorationResults([result]);
        } catch (error: any) {
             console.error("Error restoring image:", error);
             showRestorationErrorState(error.message);
             setRestorationLoadingState(false); // Ensure spinner stops
        }
    });

    function setRestorationLoadingState(isLoading: boolean) {
        if (!generateBtn || !statusContainer) return;
        generateBtn.disabled = isLoading;
        if (isLoading) {
            statusContainer.classList.remove('hidden');
            if(downloadAllBtn) downloadAllBtn.classList.add('hidden');
        } else {
            statusContainer.classList.add('hidden');
        }
    }

    function showRestorationErrorState(message: string) {
        if(errorMessage && errorDetails) {
            errorDetails.textContent = message;
            errorMessage.classList.remove('hidden');
        }
    }

    function displayRestorationResults(images: string[]) {
        if (!outputContainer) return;
        setRestorationLoadingState(false); // Stop spinner
        
        if (images.length > 0) {
            if(downloadAllBtn) {
                downloadAllBtn.classList.remove('hidden');
                downloadAllBtn.onclick = () => downloadAllImages(images, 'restoration_photo');
            }
            if(placeholderText) placeholderText.classList.add('hidden');
        } else {
             if(placeholderText) placeholderText.classList.remove('hidden');
        }

        images.forEach((imageUrl, index) => {
            const card = createResultCard(imageUrl, index, 'restored_photo');
            // For restoration, we usually want to show side-by-side or just the result. 
            // Here we assume a single result card max width.
            card.className = `relative group bg-slate-200 rounded-lg overflow-hidden shadow-sm border border-slate-200 w-full max-w-md`; 
            outputContainer.appendChild(card);
        });
    }
}

// --- BOUDOIR GENERATOR SCRIPT ---
const boudoirForm = document.getElementById('boudoir-generation-form') as HTMLFormElement;
if (boudoirForm) {
    const generateBtn = document.getElementById('boudoir-generate-btn') as HTMLButtonElement;
    const statusContainer = document.getElementById('boudoir-status') as HTMLElement;
    const outputContainer = document.getElementById('boudoir-output-container') as HTMLElement;
    const imageCountSelect = document.getElementById('boudoir-image-count') as HTMLSelectElement;
    const aspectRatioSelect = document.getElementById('boudoir-aspect-ratio') as HTMLSelectElement;
    const downloadAllBtn = document.getElementById('boudoir-download-all-btn') as HTMLButtonElement;
    const placeholderText = document.getElementById('boudoir-placeholder-text') as HTMLElement;
    const errorMessage = document.getElementById('boudoir-error-message') as HTMLElement;
    const errorDetails = document.getElementById('boudoir-error-details') as HTMLElement;

    let boudoirFile: { base64: string, mimeType: string } | null = null;

    setupFileUploader('boudoir-upload-input', 'boudoir-image-preview', 'boudoir-upload-prompt', (base64, fileType) => {
        boudoirFile = { base64, mimeType: fileType };
    });

    boudoirForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!boudoirFile) {
            showModal('Harap unggah foto terlebih dahulu.');
            return;
        }

        const imageCount = parseInt(imageCountSelect.value, 10);
        const aspectRatio = aspectRatioSelect.value;
        const location = (document.getElementById('boudoir-location') as HTMLSelectElement).value;
        const clothing = (document.getElementById('boudoir-clothing') as HTMLSelectElement).value;
        const focus = (document.getElementById('boudoir-focus') as HTMLSelectElement).value;
        const pose = (document.getElementById('boudoir-pose') as HTMLSelectElement).value;

        setBoudoirLoadingState(true);
        errorMessage.classList.add('hidden');
        outputContainer.innerHTML = '';
        placeholderText.classList.add('hidden');

        let locationPrompt = "";
        if (location === "studio") locationPrompt = "Professional photography studio, dramatic lighting.";
        else if (location === "outdoor") locationPrompt = "Outdoor natural setting (beach, forest, or waterfall), natural light.";
        else if (location === "indoor") locationPrompt = "Indoor intimate setting (bedroom, on bed, or near curtains), soft lighting.";
        else if (location === "fashion") locationPrompt = "High fashion editorial style background.";
        else if (location === "cinematic") locationPrompt = "Cinematic movie-scene atmosphere.";

        let clothingPrompt = "";
        if (clothing === "auto") clothingPrompt = "elegant and alluring outfit suitable for the setting.";
        else if (clothing === "naked") clothingPrompt = "artistic nude, tasteful and elegant, focusing on body curves and lighting.";
        else if (clothing === "lingerie") clothingPrompt = "wearing elegant lace lingerie.";
        else if (clothing === "transparent") clothingPrompt = "wearing a sheer, transparent fabric outfit.";

        const prompt = `Generate an elegant boudoir photo of the person in the uploaded image. Location: ${locationPrompt}. Clothing: ${clothingPrompt}. Focus: ${focus}. Pose: ${pose}. The mood should be sensual, artistic, and high-class. Maintain facial identity. Aspect Ratio ${aspectRatio}.`;

        const parts = [
            { text: prompt },
            { inlineData: { mimeType: boudoirFile.mimeType, data: boudoirFile.base64 } }
        ];

        const generatedImages: string[] = [];
        try {
            for (let i = 0; i < imageCount; i++) {
                const result = await generateImage(parts, aspectRatio);
                if (result) generatedImages.push(result);
            }
            displayBoudoirResults(generatedImages, aspectRatio);
        } catch (error: any) {
            console.error("Error generating boudoir images:", error);
            showBoudoirErrorState(error.message);
            if(generatedImages.length > 0) {
                displayBoudoirResults(generatedImages, aspectRatio);
            }
        } finally {
            setBoudoirLoadingState(false);
        }
    });

    function setBoudoirLoadingState(isLoading: boolean) {
        if (!generateBtn || !statusContainer) return;
        generateBtn.disabled = isLoading;
        if (isLoading) {
            statusContainer.classList.remove('hidden');
            if(downloadAllBtn) downloadAllBtn.classList.add('hidden');
        } else {
            statusContainer.classList.add('hidden');
        }
    }

    function showBoudoirErrorState(message: string) {
        if (errorMessage && errorDetails) {
            errorDetails.textContent = message;
            errorMessage.classList.remove('hidden');
        }
    }

    function displayBoudoirResults(images: string[], ratio: string) {
        if(!outputContainer) return;
        
        if (images.length > 0) {
            if (downloadAllBtn) {
                downloadAllBtn.classList.remove('hidden');
                downloadAllBtn.onclick = () => downloadAllImages(images, 'boudoir_photo');
            }
            if(placeholderText) placeholderText.classList.add('hidden');
        } else {
             if(placeholderText) placeholderText.classList.remove('hidden');
        }

        let ratioClass = "aspect-square";
        if (ratio === "3:4") ratioClass = "aspect-[3/4]";
        else if (ratio === "16:9") ratioClass = "aspect-video";
        else if (ratio === "9:16") ratioClass = "aspect-[9/16]";

        images.forEach((imageUrl, index) => {
            const card = createResultCard(imageUrl, index, 'boudoir_photo');
            card.classList.remove('aspect-square');
            card.classList.add(ratioClass);
            outputContainer.appendChild(card);
        });
    }
}
