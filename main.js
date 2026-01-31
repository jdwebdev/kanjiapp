
// console.log("MAIN JS");


let log = console.log.bind();

const main_section = id("main_section");
const training_section = id("training_section");
const main_button = id("main_button");
const training_button = id("training_button");

let params = new URLSearchParams(document.location.search);
let kanji_id = params.get("kanji");
// log("kanji id param: " + kanji_id);


// pathList.forEach(path => {
// 	const length = path.getTotalLength();
// 	path.style.transition = path.style.WebkitTransition = "none";
	
// 	path.style.strokeDasharray = length + " " + length;
// 	path.style.strokeDashoffset = length;
	
// 	path.getBoundingClientRect();
	
// 	path.style.transition = path.style.WebkitTransition = "stroke-dashoffset 0.5s ease-in-out";
	
// 	path.style.strokeDashoffset = "0";

// 	log(path);
// });

/*
	<kanji id="kvg:kanji_04f01">
		<g id="kvg:04f01" kvg:element="企">
			<g id="kvg:04f01-g1" kvg:element="人" kvg:position="top">
				<path id="kvg:04f01-s1" kvg:type="㇒" d="M52,11.75c0.11,1.07-0.06,2.59-0.72,4.05C47,25.25,31.5,45.75,11.5,56.75"/>
				<path id="kvg:04f01-s2" kvg:type="㇏" d="M51.5,16c6.09,6.96,32.31,29.69,39.02,34.79c2.28,1.73,5.2,2.47,7.48,2.96"/>
			</g>
			<g id="kvg:04f01-g2" kvg:element="止" kvg:position="bottom">
				<g id="kvg:04f01-g3" kvg:element="卜">
					<path id="kvg:04f01-s3" kvg:type="㇑a" d="M53.12,44c0.88,1.25,1.29,3,1.29,4.72c0,8.03,0.05,35.78,0.05,40.65"/>
					<path id="kvg:04f01-s4" kvg:type="㇐b" d="M55.67,65.36c6.5-0.51,11.6-1.71,18.44-2.05c1.59-0.08,1.99-0.17,2.98,0"/>
				</g>
				<path id="kvg:04f01-s5" kvg:type="㇑a" d="M31.03,65.32c0.72,0.93,1.04,2.3,1.04,3.97c0,4.46,0.05,16.96,0.05,21.93"/>
				<path id="kvg:04f01-s6" kvg:type="㇐" d="M18.67,92.11c3.25,0.94,6.53,0.59,9.83,0.33c12.47-0.95,35.87-2.57,49-3.03c3.45-0.12,6.91-0.08,10.33,0.58"/>
			</g>
		</g>
	</kanji>
	<kanji id="kvg:kanji_04f09">
		<g id="kvg:04f09" kvg:element="伉">
			<g id="kvg:04f09-g1" kvg:element="亻" kvg:variant="true" kvg:original="人" kvg:position="left">
				<path id="kvg:04f09-s1" kvg:type="㇒" d="M32.99,16.89c0.13,1.1,0.23,2.47-0.12,3.82c-2.21,8.51-10.76,24.97-21.07,36.51"/>
				<path id="kvg:04f09-s2" kvg:type="㇑" d="M26.01,41c0.63,0.66,0.81,2.11,0.81,3.46c0,13.96-0.31,43.03-0.31,52.41"/>
			</g>
			<g id="kvg:04f09-g2" kvg:element="亢" kvg:position="right">
				<g id="kvg:04f09-g3" kvg:element="亠" kvg:position="top">
					<path id="kvg:04f09-s3" kvg:type="㇑a" d="M61.43,12.75c0.91,0.61,2.4,2.96,2.4,4.16c0,4.45-0.12,5.59-0.12,9.65"/>
					<path id="kvg:04f09-s4" kvg:type="㇐" d="M38.02,29.23c1.23,0.77,3.96,1.1,6.09,0.87c12.64-1.35,29.64-4.85,44.25-5.85c2.36-0.16,3.57,0.07,5.33,1.11"/>
				</g>
				<g id="kvg:04f09-g4" kvg:element="几" kvg:position="bottom">
					<g id="kvg:04f09-g5" kvg:element="丿">
						<path id="kvg:04f09-s5" kvg:type="㇒" d="M52.57,42.5c0.41,0.91,0.91,3.06,0.96,4.78c0.1,3.68,0.11,3.48,0.05,10.33C53.43,75.35,46.51,89.1,39.5,93"/>
					</g>
					<path id="kvg:04f09-s6" kvg:type="㇈b" d="M53.37,43.5c4.55-1,13.83-2.99,18.38-4.25c3.62-1,4.75,2.01,4.49,4.55c-0.99,9.95-0.96,33.64-0.96,39.2c0,10.75,3.46,11.53,10.29,11.53c7.92,0,10.31-2.28,10.31-9.12"/>
				</g>
			</g>
		</g>
	</kanji>
	<kanji id="kvg:kanji_04f0a">
		<g id="kvg:04f0a" kvg:element="伊">
			<g id="kvg:04f0a-g1" kvg:element="亻" kvg:variant="true" kvg:original="人" kvg:position="left">
				<path id="kvg:04f0a-s1" kvg:type="㇒" d="M32.75,15.64c0.13,1.23-0.03,2.53-0.36,4.04C30.25,29.25,21.25,47,11.31,59.97"/>
				<path id="kvg:04f0a-s2" kvg:type="㇑" d="M25.53,41.5c0.98,0.98,1.01,2,1.01,3.73c0,10.59-0.03,29.34-0.04,41.52c0,2.8,0,5.23,0,7.12"/>
			</g>
			<g id="kvg:04f0a-g2" kvg:element="尹" kvg:position="right">
				<g id="kvg:04f0a-g3" kvg:element="⺕" kvg:variant="true" kvg:original="彑">
					<g id="kvg:04f0a-g4" kvg:element="尸" kvg:part="1">
						<path id="kvg:04f0a-s3" kvg:type="㇕c" d="M44.21,21.32c2.46,1.04,5.71,1.07,8.3,0.64c9.06-1.52,20.88-3.54,28.36-4.46c2.43-0.3,4.14,1.28,3.77,3.84c-0.99,6.7-2.63,23.06-3.95,34.59"/>
						<path id="kvg:04f0a-s4" kvg:type="㇐" d="M36.9,42.6c2.91,1.07,6.25,0.8,9.23,0.29c14.3-2.47,30.47-4.95,42.75-5.9c3.43-0.26,5.95-0.1,9.23,0.74"/>
					</g>
					<path id="kvg:04f0a-s5" kvg:type="㇐" d="M42.9,62.05c2.86,0.73,4.95,0.64,7.86,0.02c9.24-1.95,18.12-3.14,26.25-4c2.7-0.28,5.54-0.67,8.23-0.1"/>
				</g>
				<g id="kvg:04f0a-g5" kvg:element="尸" kvg:part="2">
					<g id="kvg:04f0a-g6" kvg:element="丿">
						<path id="kvg:04f0a-s6" kvg:type="㇒" d="M60.66,27.6c0.59,1.03,0.91,2.38,0.94,3.47c0.9,37.43-3.85,51.18-13.68,62.43"/>
					</g>
				</g>
			</g>
		</g>
	</kanji>
	<kanji id="kvg:kanji_04f0d">
		<g id="kvg:04f0d" kvg:element="伍">
			<g id="kvg:04f0d-g1" kvg:element="亻" kvg:variant="true" kvg:original="人" kvg:position="left">
				<path id="kvg:04f0d-s1" kvg:type="㇒" d="M36.66,15.64c0.16,1.19-0.08,2.73-0.64,4.14C32.38,29,22.5,45.5,10,58.89"/>
				<path id="kvg:04f0d-s2" kvg:type="㇑" d="M26.17,41.56c0.82,0.82,0.95,2.15,0.95,3.37c0,10.03-0.07,31.6-0.1,44.2c-0.01,3.18-0.01,5.79-0.01,7.5"/>
			</g>
			<g id="kvg:04f0d-g2" kvg:element="五" kvg:position="right">
				<g id="kvg:04f0d-g3" kvg:element="二" kvg:part="1">
					<path id="kvg:04f0d-s3" kvg:type="㇐" d="M45.88,21.14c2.12,0.61,4.95,0.55,6.87,0.33c8.5-0.97,19.83-1.88,29.76-2.43c2.25-0.13,4.55-0.25,6.75,0.42"/>
				</g>
				<path id="kvg:04f0d-s4" kvg:type="㇑a" d="M65.77,24.03c0.35,1.34,0.19,2.96-0.17,4.5C63.12,39.25,52.12,80.5,49.68,88.89"/>
				<path id="kvg:04f0d-s5" kvg:type="㇕c" d="M42.87,53.86c1.76,0.64,3.86,1.08,5.63,0.88c10.5-1.24,26.75-2.86,32.24-3.3c2.08-0.16,3.89,1.43,3.43,4.18C83.31,60.66,80,82.5,79.1,88.03"/>
				<g id="kvg:04f0d-g4" kvg:element="二" kvg:part="2">
					<path id="kvg:04f0d-s6" kvg:type="㇐" d="M34,91.22c3.12,0.66,6.95,0.46,10.01,0.26c10.16-0.68,28.98-2.11,43.87-2.41c3.48-0.07,7.21-0.13,10.62,0.71"/>
				</g>
			</g>
		</g>
	</kanji>
	<kanji id="kvg:kanji_04f0e">
		<g id="kvg:04f0e" kvg:element="伎">
			<g id="kvg:04f0e-g1" kvg:element="亻" kvg:variant="true" kvg:original="人" kvg:position="left">
				<path id="kvg:04f0e-s1" kvg:type="㇒" d="M35.47,14.39c0.16,1.27,0.04,2.61-0.39,4.16C31.75,30.38,22.04,47.39,9.56,60.72"/>
				<path id="kvg:04f0e-s2" kvg:type="㇑" d="M24.78,43.75c0.98,0.98,1.26,2.12,1.26,3.98c0,10.43-0.03,29.67-0.04,41.51c0,2.94,0,5.4,0,7.14"/>
			</g>
			<g id="kvg:04f0e-g2" kvg:element="支" kvg:position="right">
				<g id="kvg:04f0e-g3" kvg:element="十" kvg:position="top">
					<path id="kvg:04f0e-s3" kvg:type="㇐" d="M39.35,33.03c2.77,0.85,5.78,0.66,8.28,0.27c12.58-1.96,23.12-3.42,34.86-4.36c2.71-0.22,5.58-0.2,8.22,0.49"/>
					<path id="kvg:04f0e-s4" kvg:type="㇑a" d="M60.97,11.38c1.07,1.07,1.34,2.49,1.34,4.33c0,5.29,0.04,26.29,0.04,32.67"/>
				</g>
				<g id="kvg:04f0e-g4" kvg:element="又" kvg:position="bottom">
					<path id="kvg:04f0e-s5" kvg:type="㇇" d="M45.08,51.54c2.56,0.76,4.26,0.42,6.92-0.05c7.88-1.37,14.5-2.62,22.83-4.51c2.85-0.65,4.17,1.04,3.15,3.3c-8.74,19.46-22.61,35.58-43,45.46"/>
					<path id="kvg:04f0e-s6" kvg:type="㇏" d="M44.33,56.89c4.46,0.83,23.8,19.73,39.98,31.95c3.35,2.53,6.53,4.31,10.42,5.88"/>
				</g>
			</g>
		</g>
	</kanji>
	<kanji id="kvg:kanji_04f0f">
		<g id="kvg:04f0f" kvg:element="伏">
			<g id="kvg:04f0f-g1" kvg:element="亻" kvg:variant="true" kvg:original="人" kvg:position="left">
				<path id="kvg:04f0f-s1" kvg:type="㇒" d="M32.75,14.64c0.13,1.23,0.12,2.57-0.36,4.04C28.88,29.38,22,43.75,12.06,56.72"/>
				<path id="kvg:04f0f-s2" kvg:type="㇑" d="M25.03,40.5c0.92,0.92,1.26,2.12,1.26,3.73c0,10.5,0.06,32.2-0.01,44.52c-0.02,2.96-0.03,5.43-0.03,7.12"/>
			</g>
			<g id="kvg:04f0f-g2" kvg:element="犬" kvg:position="right">
				<g id="kvg:04f0f-g3" kvg:element="大">
					<path id="kvg:04f0f-s3" kvg:type="㇐" d="M35.88,46.44c2.62,0.56,5.59,0.51,7.99,0.21c9.12-1.15,24.88-3.15,36.52-4.04c2.63-0.2,5.03-0.36,7.62,0.29"/>
					<path id="kvg:04f0f-s4" kvg:type="㇒" d="M59.27,14.75c1.05,1.05,1.21,2.25,1.29,4.36C61.62,49.25,57.62,81.38,34.75,96"/>
					<path id="kvg:04f0f-s5" kvg:type="㇏" d="M60.62,48.75c6.22,10.89,16.59,27.39,25.41,37.54c2.16,2.49,4.48,5.32,7.21,7.21"/>
				</g>
				<g id="kvg:04f0f-g4" kvg:element="丶">
					<path id="kvg:04f0f-s6" kvg:type="㇔" d="M77.58,20.75c5.29,3.38,8.93,7.09,11.17,11"/>
				</g>
			</g>
		</g>
	</kanji>
	<kanji id="kvg:kanji_04f10">
		<g id="kvg:04f10" kvg:element="伐">
			<g id="kvg:04f10-g1" kvg:element="亻" kvg:variant="true" kvg:original="人" kvg:position="left">
				<path id="kvg:04f10-s1" kvg:type="㇒" d="M32.99,15.39c0.13,1.16,0.06,2.38-0.37,3.78C29.62,29,21.35,45.79,10.81,57.97"/>
				<path id="kvg:04f10-s2" kvg:type="㇑" d="M25.53,40.5c1.05,1.05,1.26,2.38,1.26,4.23c0,10.25-0.03,29.62-0.04,41.77c0,3.28,0,6.01,0,7.88"/>
			</g>
			<g id="kvg:04f10-g2" kvg:element="戈" kvg:position="right">
				<g id="kvg:04f10-g3" kvg:element="弋" kvg:part="1">
					<path id="kvg:04f10-s3" kvg:type="㇐" d="M37.75,41.76c2.75,0.49,4.25,0.5,6.73-0.04c7.9-1.71,23.27-6.46,34.8-8.07c2.25-0.31,4.97-0.4,7.22,0.06"/>
					<path id="kvg:04f10-s4" kvg:type="㇂" d="M55,11.75c1.31,1.31,2.16,3.12,2.46,6.17C60.88,52.5,72,78.5,89.51,93.46c5.64,4.82,5.18,1.02,4.38-6.94"/>
				</g>
				<g id="kvg:04f10-g4" kvg:element="丿">
					<path id="kvg:04f10-s5" kvg:type="㇒" d="M84.69,45.39c-0.07,1.73-0.54,3.07-1.5,4.95c-4.57,8.91-18.32,25.41-39.63,35.88"/>
				</g>
				<g id="kvg:04f10-g5" kvg:element="弋" kvg:part="2">
					<g id="kvg:04f10-g6" kvg:element="丶">
						<path id="kvg:04f10-s6" kvg:type="㇔" d="M81.75,14.12c3.18,2.08,8.27,6.82,9.75,10.38"/>
					</g>
				</g>
			</g>
		</g>
	</kanji>
	<kanji id="kvg:kanji_04f11">
		<g id="kvg:04f11" kvg:element="休">
			<g id="kvg:04f11-g1" kvg:element="亻" kvg:variant="true" kvg:original="人" kvg:position="left">
				<path id="kvg:04f11-s1" kvg:type="㇒" d="M35,16.5c0.25,1.75,0.25,4.25-0.88,6.8C28.91,35.01,22.37,46.02,10.5,60.29"/>
				<path id="kvg:04f11-s2" kvg:type="㇑" d="M26.28,42.5c0.72,1.25,1.26,3.48,1.26,4.75c0,12.75-0.07,29.88-0.26,42.25c-0.02,1.54-0.04,2.97-0.04,4.25"/>
			</g>
			<g id="kvg:04f11-g2" kvg:element="木" kvg:position="right">
				<path id="kvg:04f11-s3" kvg:type="㇐" d="M37.65,38.83c2.45,0.97,5.18,0.75,7.73,0.54c11.76-0.97,24.94-3.35,37.49-4.01c2.65-0.14,5.39-0.22,7.99,0.39"/>
				<path id="kvg:04f11-s4" kvg:type="㇑" d="M61.43,14c0.82,0.75,1.87,2.12,1.87,3.7c0,8.8,0.05,53.72-0.12,72.05c-0.03,2.88-0.06,4.91-0.08,5.75"/>
				<path id="kvg:04f11-s5" kvg:type="㇒" d="M62.43,38.32c0,2.18-1.1,4.31-1.9,6.04C54.57,57.4,44.96,71.84,35,78.75"/>
				<path id="kvg:04f11-s6" kvg:type="㇏" d="M64.12,38.08c4.45,8.37,16.21,25.33,24.99,33.19c1.96,1.76,4.35,4.18,6.9,5"/>
			</g>
		</g>
	</kanji>
	<kanji id="kvg:kanji_04f1a">
		<g id="kvg:04f1a" kvg:element="会">
			<g id="kvg:04f1a-g1" kvg:element="人" kvg:position="top">
				<path id="kvg:04f1a-s1" kvg:type="㇒" d="M52.25,14c0.25,2.28-0.52,3.59-1.8,5.62c-5.76,9.14-17.9,27-39.2,39.88"/>
				<path id="kvg:04f1a-s2" kvg:type="㇏" d="M54.5,19.25c6.73,7.3,24.09,24.81,32.95,31.91c2.73,2.18,5.61,3.8,9.05,4.59"/>
			</g>
			<g id="kvg:04f1a-g2" kvg:element="云" kvg:position="bottom">
				<g id="kvg:04f1a-g3" kvg:element="二">
					<path id="kvg:04f1a-s3" kvg:type="㇐" d="M37.36,50.16c1.64,0.34,4.04,0.36,4.98,0.25c6.79-0.79,14.29-1.91,19.66-2.4c1.56-0.14,3.25-0.39,4.66,0"/>
					<path id="kvg:04f1a-s4" kvg:type="㇐" d="M23,65.98c2.12,0.52,4.25,0.64,7.01,0.3c13.77-1.71,30.99-3.66,46.35-3.74c3.04-0.02,4.87,0.14,6.4,0.29"/>
				</g>
				<g id="kvg:04f1a-g4" kvg:element="厶">
					<path id="kvg:04f1a-s5" kvg:type="㇜" d="M47.16,66.38c0.62,1.65-0.03,2.93-0.92,4.28c-5.17,7.8-8.02,11.38-14.99,18.84c-2.11,2.25-1.5,4.18,2,3.75c7.35-0.91,28.19-5.83,40.16-7.95"/>
					<path id="kvg:04f1a-s6" kvg:type="㇔" d="M66.62,77.39c4.52,3.23,11,12.73,13.06,18.82"/>
				</g>
			</g>
		</g>
	</kanji>
	<kanji id="kvg:kanji_04f1c">
		<g id="kvg:04f1c" kvg:element="伜">
			<g id="kvg:04f1c-g1" kvg:element="亻" kvg:variant="true" kvg:original="人" kvg:position="left">
				<path id="kvg:04f1c-s1" kvg:type="㇒" d="M32.48,16.89c0.14,1.13,0.25,2.55-0.13,3.93C29.99,29.6,20.84,46.57,9.81,58.47"/>
				<path id="kvg:04f1c-s2" kvg:type="㇑" d="M25.99,41c0.66,0.68,0.84,2.19,0.84,3.58c0,14.46-0.32,39.08-0.32,48.79"/>
			</g>
			<g id="kvg:04f1c-g2" kvg:element="卆" kvg:position="right">
				<g id="kvg:04f1c-g3" kvg:element="九" kvg:position="top">
					<path id="kvg:04f1c-s3" kvg:type="㇒" d="M62.43,13.12c0.27,0.92,0.54,1.9,0.44,2.61C60.25,34.25,54,52,41.88,60.75"/>
					<g id="kvg:04f1c-g4" kvg:element="乙">
						<path id="kvg:04f1c-s4" kvg:type="㇈" d="M42.29,27.12c0.85,0.35,4.03,0.12,5.09,0c3.37-0.37,26.12-4.37,30-5.02c2.09-0.35,2.99,1.66,2.71,3.11c-0.59,3.04-3.8,11.66-3.8,16.63c0,5.91,2.46,9.91,9.64,9.91c7.07,0,9.53-1.61,9.53-6.29"/>
					</g>
				</g>
				<g id="kvg:04f1c-g5" kvg:element="十" kvg:position="bottom">
					<path id="kvg:04f1c-s5" kvg:type="㇐" d="M37.38,70.12c1.61,0.64,4.57,0.8,6.18,0.64c13.2-1.27,31.81-4.95,45.94-5.2c2.68-0.05,4.29,0.31,5.64,0.63"/>
					<path id="kvg:04f1c-s6" kvg:type="㇑" d="M64.71,54.88c0.52,0.41,1.62,3.11,1.73,3.93c0.11,0.83-0.07,33.63-0.17,38.82"/>
				</g>
			</g>
		</g>
	</kanji>
	<kanji id="kvg:kanji_04f1d">
		<g id="kvg:04f1d" kvg:element="伝">
			<g id="kvg:04f1d-g1" kvg:element="亻" kvg:variant="true" kvg:original="人" kvg:position="left">
				<path id="kvg:04f1d-s1" kvg:type="㇒" d="M31.61,20c0.14,1.25,0.07,2.47-0.47,3.93c-4.39,11.82-9.77,22.13-19.64,36.36"/>
				<path id="kvg:04f1d-s2" kvg:type="㇑" d="M26.03,41.5c0.97,1,1.5,2.42,1.5,3.88c0,10.94-0.02,30.36-0.03,41.25c0,2.61,0,4.73,0,6.12"/>
			</g>
			<g id="kvg:04f1d-g2" kvg:element="云" kvg:position="right" kvg:phon="云/專V">
				<g id="kvg:04f1d-g3" kvg:element="二" kvg:position="top">
					<path id="kvg:04f1d-s3" kvg:type="㇐" d="M46.39,25.58c2.11,0.42,4.35,0.41,6.1,0.18c8.38-1.09,19.82-2.35,27.9-2.79c1.69-0.09,3.39-0.24,5.04,0.19"/>
					<path id="kvg:04f1d-s4" kvg:type="㇐" d="M38.25,48.83c2.48,0.78,5.36,0.65,7.88,0.36c13.62-1.57,30.24-3.32,42.37-4.31c2.51-0.21,5.01-0.22,7.5,0.25"/>
				</g>
				<g id="kvg:04f1d-g4" kvg:element="厶" kvg:position="bottom">
					<path id="kvg:04f1d-s5" kvg:type="㇜" d="M64.15,50.85c0.37,1.15,0.35,2.59-0.3,4.04C59.75,64,54.75,73.75,47.43,84.62c-1.94,2.87-1.37,4.72,2.14,3.73c12.31-3.48,20.31-5.98,36.04-10.09"/>
					<path id="kvg:04f1d-s6" kvg:type="㇔" d="M79.75,68.21c4.66,3.92,11.41,16.05,12.57,22.15"/>
				</g>
			</g>
		</g>
	</kanji>
	<kanji id="kvg:kanji_04f2f">
		<g id="kvg:04f2f" kvg:element="伯">
			<g id="kvg:04f2f-g1" kvg:element="亻" kvg:variant="true" kvg:original="人" kvg:position="left">
				<path id="kvg:04f2f-s1" kvg:type="㇒" d="M38.48,15.14c0.15,1.1,0.02,2.48-0.39,3.84c-2.55,8.56-12.15,25.38-24.03,36.98"/>
				<path id="kvg:04f2f-s2" kvg:type="㇑" d="M29.01,39.75c0.94,0.93,1.31,2.37,1.31,3.73c0,11.86,0.03,34.6-0.04,47.02c-0.01,2.26-0.02,4.18-0.02,5.62"/>
			</g>
			<g id="kvg:04f2f-g2" kvg:element="白" kvg:position="right" kvg:phon="白">
				<g id="kvg:04f2f-g3" kvg:position="top">
					<path id="kvg:04f2f-s3" kvg:type="㇔" d="M72.38,16c0.25,1.12,0.03,2.11-0.27,2.84c-2.36,5.78-7.36,14.03-13.42,21.37"/>
				</g>
				<g id="kvg:04f2f-g4" kvg:element="日" kvg:position="bottom">
					<path id="kvg:04f2f-s4" kvg:type="㇑" d="M50.69,41.91c1.13,1.13,1.34,2.42,1.34,4.13c0,1.09-0.02,27.32-0.03,40.33c0,3.98,0,6.72,0,7.12"/>
					<path id="kvg:04f2f-s5" kvg:type="㇕a" d="M52.94,44.43c4.89-0.61,26.6-2.92,33.58-3.65c3.11-0.32,4.79,0.39,4.78,3.92c-0.01,3.96-0.02,25.42-0.02,40.82c0,2.45-0.03,4.27-0.03,6.48"/>
					<path id="kvg:04f2f-s6" kvg:type="㇐a" d="M53.14,66.15c9.61-1.02,29.73-3.02,37.04-3.26"/>
					<path id="kvg:04f2f-s7" kvg:type="㇐a" d="M53.15,90.47c9.49-0.69,26.75-2.33,36.87-2.64"/>
				</g>
			</g>
		</g>
	</kanji>
*/

// let sakura = { kanji: "鬱", pathString: "M48.3,10.89c0.02,0.26,0.04,0.66-0.04,1.03c-0.49,2.16-3.33,6.91-7.22,9.82;M47.11,16.35c0.31,0.13,0.88,0.15,1.19,0.13c3.8-0.35,9.58-1.17,12.99-1.61c0.51-0.07,0.83,0.06,1.08,0.12;M40.26,24.54c0.5,0.18,1.42,0.21,1.92,0.18c5.22-0.3,15.2-1.82,22.82-1.89c0.83-0.01,1.34,0.08,1.75,0.17;M53.11,16.58c0.31,0.45,0.66,0.78,0.66,1.4c0,2.18-0.03,15.57-0.08,17.41;M44.2,29.3c0.25,0.15,0.5,0.77,0.5,1.07c-0.02,1.85-0.02,1.1,0,4.61c0,0.68-0.12,1.34,0.5,1.24c1.71-0.29,13.7-1.9,16.84-1.99;M63.35,27.91c0.25,0.15,0.54,1.11,0.5,1.4c-0.25,1.82-0.5,3.19-0.91,6.57;M14.87,19.27c0.52,0.09,2.1,0.08,3.49,0c4.88-0.26,11.48-0.71,16.71-0.88c0.89-0.03,1.94-0.31,3.31-0.18;M28.06,10.34c0.59,0.23,0.94,1.06,1.06,1.53c0.12,0.47,0,23.55-0.12,26.49;M29.4,20.03c-2.67,4.49-10.61,12.03-16.15,14.57;M31.28,23.22c2.12,1.2,4.39,3.61,5.6,5.72;M68.83,18.29c0.33,0.12,1.06,0.18,1.95,0.12c3.15-0.24,12.6-1.06,18.75-1.65c0.89-0.08,1.67-0.12,2.23,0;M77.1,10.4c0.59,0.23,0.94,1.06,1.06,1.53c0.12,0.47,0,21.26-0.12,24.2;M78.07,18.62c-1.53,4.22-6.28,10.08-9.83,12.25;M78.02,18.54c3.84,4.51,9.99,10.29,13.1,12.07c0.89,0.51,1.39,0.86,2.13,1.03;M19.16,41.13c0,2.91-3.72,10.92-5.41,12.87;M18.99,44.24c9.51-0.99,60.24-3.03,67.95-3.4C99,40.25,89.5,48,86.5,50.11;M44.91,49.53c0.05,0.47,0.27,1.29-0.1,1.9C42.5,55.25,34.5,65,27.1,69.61;M29.57,52.91c5.7,2.95,14.71,12.14,16.14,16.74;M33.78,47.58c1.41,0.79,3.63,3.24,3.99,4.47;M26.71,56.64c1.41,0.88,3.63,3.6,3.99,4.97;M45.7,58.3c1.14,0.79,2.95,3.24,3.24,4.47;M35.51,65.78c1.19,0.56,3.07,2.31,3.37,3.18;M19.46,53.75c0.32,0.2,0.86,0.97,0.86,1.94c0,0.41,1.67,16.44,1.64,17.41c-0.03,0.96,0.29,1.65,1.35,1.54c5.9-0.57,25.29-1.48,28.67-1.68;M52.64,51.99c0.62,0.28,1.08,0.85,1.08,1.94c0,2.18-0.21,11.43-0.95,21.2;M46.74,79.93c0.17,0.18,0.28,0.72-0.17,1c-2.9,1.83-12.86,6.87-22.25,8.73;M21.46,79.82c0.59,0.56,0.63,0.93,0.83,1.67c0.2,0.75-0.04,8.93-0.04,11.26c0,5.99,7.88,5.06,14.59,5.06c5.2,0,9.54-0.32,11.5-1.99c1.96-1.67,1.72-3.62,1.92-5.3;M80.11,50.75c0.06,0.34,0.22,0.92-0.12,1.36C77,56,71.25,60.25,59.75,64.63;M85.67,64.39c0.08,0.4,0.28,1.09-0.15,1.61c-2.95,3.51-16.27,11.5-27.03,15.37;M91.3,79c0.1,0.47,0.2,1.22-0.18,1.9C88.85,84.89,75.86,93.64,58.07,99;", pathList: [] };
// sakura.pathList = sakura.pathString.split(";");
// sakura.pathList.pop();

// let innerHTML = `<svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" version="1.1" baseProfile="full">`;
// sakura.pathList.forEach(p => {
// 	innerHTML += `<path d="${p}" style="fill:none;stroke:rgba(255,0,0,1);stroke-width:5" />`
// });
// innerHTML += `</svg>`;

// let innerHTML2 = `<svg width="200" height="200" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" version="1.1" baseProfile="full">`;
// sakura.pathList.forEach(p => {
// 	innerHTML2 += `<path d="${p}" style="fill:none;stroke:black;stroke-width:5" />`
// });
// innerHTML2 += `</svg>`;

// let kai_bg = id("kai_bg");
// kai_bg.innerHTML = innerHTML;
// let kai = id("kai");
// kai.innerHTML = innerHTML2;
// let pathList = document.querySelectorAll("#kai path");


// pathList.forEach(path => {
// 	const length = path.getTotalLength();
// 	path.style.transition = path.style.WebkitTransition = "none";
// 	path.style.strokeDasharray = length + " " + length;
// 	path.style.strokeDashoffset = length;
// });

let currentIndex = 0;
let pathList = null;
const h = "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんがぎぐげござじずぜぞだぢづでどばびぶべぼぱぴぷぺぽゔっゎぁぃぅぇぉゃゅょゐゑ";
const k = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポヴッヮァィゥェォャュョヰヱー";
const letterList = "abcdefghijklmnopqrstuvwxyzçàâäéèêëîïôöûüù'- ";
const kanaList = h+k;

let currentSection = "main";
let bSearching = false;
const search_input = id("search_input");
const search_btn = id("search_btn");
const stop_search_btn = id("stop_search_btn");
let bModal = false;
let bModalOpened = false;
const modal_container = id("modal_container");
modal_container.style.height = (window.innerHeight-50) + "px";
id("header").addEventListener("click", e => {
	if (bModal) closeModal();
});
search_input.addEventListener("click", e => {
	log("input click");
	bSearching = true;
	// e.preventDefault();
	none(search_btn);
	unset(stop_search_btn);
	let len = search_input.value.length;
    if (search_input.setSelectionRange) {
        search_input.focus();
        search_input.setSelectionRange(len, len);
    }
	if (currentSection != "main") {
		changeSection("main");
	}

	e.stopPropagation();
});

search_btn.addEventListener("click", e => {
	log("search btn click"); // 1
	if (bSearching) {
		bSearching = false;
		none(stop_search_btn);
		unset(search_btn);
		// search_input.value = "";
		log(search_input.value);
		search(search_input.value);
		e.preventDefault();
		e.stopPropagation();
		search_input.blur();
	} else {
		bSearching = true;
		e.preventDefault();
		e.stopPropagation();
		let len = search_input.value.length;
		if (search_input.setSelectionRange) {
			search_input.focus();
			search_input.setSelectionRange(len, len);
		}
		none(search_btn);
		unset(stop_search_btn);
		if (currentSection != "main") {
			changeSection("main");
		}
	}
});

function isFullKana(pWord) {
	let bFullKana = true;
	for (let i = 0; i < pWord.length; i++) {
		if (!kanaList.includes(pWord[i])) {
			bFullKana = false;
			i = pWord.length;
		}
	}
	return bFullKana;
}
function isFullLetter(pWord) {
	let bFullLetter = true;
	for (let i = 0; i < pWord.length; i++) {
		if (!letterList.includes(pWord[i].toLowerCase())) {
			bFullLetter = false;
			i = pWord.length;
		}
	}
	return bFullLetter;
}

function startApp() {
	none(id("loading_container"));
	id("search_input").disabled = false;
	id("search_btn").disabled = false;
	id("training_button").disabled = false;
	unset(id("main_background"));

	// changeSection("training");
}

function search(pWord) {
	if (bModal) closeModal();
	let foundKanjiList = [];
	let exactWordArr = [];
	let includingWordArr = [];
	let bFullLetter = false;
	let bFullKana = false;
	pWord = pWord.trim();
	pWord = pWord.toLowerCase();
	if (pWord != "") {

		if (isFullLetter(pWord)) {
			bFullLetter = true;
		} else {
			log("NOT FULL LETTER");
		}

		if (isFullKana(pWord)) {
			bFullKana = true;
		} else {
			// log("NOT FULL KANA");
		}

		if (!bFullLetter && !bFullKana) {
			for (let i = 0; i < pWord.length; i++) {
				if (Kanji.kanjiList.includes(pWord[i])) {
					const kanji = Kanji.list.find(k => k.kanji == pWord[i]);
					foundKanjiList.push(kanji.id);
				}
			}
	
			if (Word.wordList.includes(pWord)) {
				exactWordArr = Word.list.filter(w => w.word == pWord);
				includingWordArr = Word.list.filter(w => (w.word.includes(pWord) && w.word !== pWord));
			} else {
				includingWordArr = Word.list.filter(w => (w.word.includes(pWord) && w.word !== pWord));
			}

		} else if (bFullLetter) {
			let tempArr = Kanji.list.filter(k => k.imi.toLowerCase().includes(pWord));
			tempArr.forEach(k => {
				foundKanjiList.push(k.id);
			});
			log("found kanji list: ");
			log(foundKanjiList);
			// if (Word.imiList.includes(pWord)) {
				// log("imiList includes pWord: " + pWord);
				exactWordArr = Word.list.filter(w => w.imi.toLowerCase() == pWord);
				includingWordArr = Word.list.filter(w => (w.imi.toLowerCase().includes(pWord) && w.imi.toLowerCase() != pWord));
			// }
		} else if (bFullKana) {
			let tempArr = Kanji.list.filter(k => k.kunYomiRaw.includes(pWord));
			tempArr.forEach(k => {
				foundKanjiList.push(k.id);
			});
			log("found kanji list: ");
			log(foundKanjiList);
			// if (Word.imiList.includes(pWord)) {
				// log("imiList includes pWord: " + pWord);
				exactWordArr = Word.list.filter(w => w.yomiRaw == pWord);
				includingWordArr = Word.list.filter(w => (w.yomiRaw.includes(pWord) && w.yomiRaw != pWord));
			// }
		}

		let kanjiHTML = `<div class="kanji_result_header">漢字 ${foundKanjiList.length}</div>`;

		const kanji_result_container = id("kanji_result_container");
		foundKanjiList.forEach( (k, index) => {
		let yomi = `${Kanji.list[k].onYomi}${(Kanji.list[k].onYomi.length > 0 && Kanji.list[k].kunYomi.length > 0) ? " | " : ""}${Kanji.list[k].kunYomi}`;
		if (yomi.length >= 46) {
			yomi = yomi.slice(0, 45);
			yomi += "...";
		}
		let imi = `${Kanji.list[k].imi}`;
		if (imi.length >= 106) {
			imi = imi.slice(0, 104);
			imi += "...";
		}

		kanjiHTML +=
			`
			<div class="kanji_result" id="kanji_id_${k}" onClick="kanjiInfo(${k}, this)">
				<div class="kanji_result_kanji">${Kanji.list[k].kanji}</div>
				<div class="kanji_result_yomi_imi">
					<div class="kanji_result_yomi">${yomi}</div>
					<div class="kanji_result_imi">${imi}</div>
				</div>
				<div class="kanji_result_misc">
					<ul class="kanji_result_ul">
						<li class="kanji_result_itaiji">${Kanji.list[k].itaiji}</li>
						<li class="kanji_result_kakusuu">${Kanji.list[k].kakusuu}画</li>
						<li class="kanken_lvl">
							<div class="kanken_left">${Kanji.list[k].kanken}</div>
							<div class="kanken_right">級</div>
						</li>
					</ul>
				</div>
			</div>
			`;
		});
		kanjiHTML += "</div>";
		kanji_result_container.innerHTML = kanjiHTML;

		log(exactWordArr);
		log(includingWordArr);
		
		const word_result_container = id("word_result_container");
		let wordHTML = `<div class="kanji_result_header">単語 ${exactWordArr.length + includingWordArr.length}</div>`;
		exactWordArr.forEach(w => {
			wordHTML += 
			`
			<div class="word_result" id="word_id_${w.id}">
				<div class="word_result_yomi_word">
					<div class="word_result_yomi">${w.yomi}</div>
					<div class="word_result_word">${w.word}</div>
					<div class="word_result_imi">${w.imi}</div>
				</div>
				<div class="word_result_misc">
			`;
			if (w.yojijukugo) {
				wordHTML += 
				`
					<div class="yojijukugo">四字熟語</div>
					<div class="kanken_lvl word_kanken">
						<div class="kanken_left">5</div>
						<div class="kanken_right">級</div>
					</div>
				`;
			}
			wordHTML += "</div></div>";
		});
		
		includingWordArr.forEach(w => {
			wordHTML += 
			`
			<div class="word_result" id="word_id_${w.id}">
				<div class="word_result_yomi_word">
					<div class="word_result_yomi">${w.yomi}</div>
					<div class="word_result_word">${w.word}</div>
					<div class="word_result_imi">${w.imi}</div>
				</div>
				<div class="word_result_misc">
			`;
			if (w.yojijukugo) {
				wordHTML += 
				`
					<div class="yojijukugo">四字熟語</div>
					<div class="kanken_lvl word_kanken">
						<div class="kanken_left">5</div>
						<div class="kanken_right">級</div>
					</div>
				`;
			}
			wordHTML += "</div></div>";
		});

		word_result_container.innerHTML = wordHTML;

	} else {
		const kanji_result_container = id("kanji_result_container");
		const word_result_container = id("word_result_container");
		kanji_result_container.innerHTML = `
		<div class="kanji_result_header">漢字 0</div>
		<p class="no_result">No result</p>
		`;
		word_result_container.innerHTML = `
		<div class="kanji_result_header">単語 0</div>
		<p class="no_result">No result</p>
		`;
	}
}

function kanjiInfo(pIndex, e) {

	log("KANJI INFO: " + pIndex);
	log(Kanji.list[pIndex]);

	let html = 
	`
	<div id="modal">
		<!--<div class="modal_content">-->
			<div class="modal_header">
				<div class="modal_kanji">${Kanji.list[pIndex].kanji}</div>
				<div class="modal_kanji_info">
					<div class="modal_stroke_bushu">
						<p class="modal_stroke">${Kanji.list[pIndex].kakusuu}画</p>
						<!--<p class="modal_bushu">${Kanji.bushuList[Kanji.list[pIndex].bushu-1].bushu}</p>-->

						<span id="modal_bushu">${Kanji.bushuList[Kanji.list[pIndex].bushu-1].bushu}<span
							class="modal_tooltip_bushu">${Kanji.bushuList[Kanji.list[pIndex].bushu-1].yomi}</span>
						</span>

					</div>
					<div class="modal_plus_alpha">
						<div class="kanken_lvl word_kanken">
							<div class="kanken_left">${Kanji.list[pIndex].kanken}</div>
							<div class="kanken_right">級</div>
						</div>
						<p class="modal_kanken_page">(${Kanji.list[pIndex].jitenRef})</p>
					</div>
					<div class="modal_itaiji">${Kanji.list[pIndex].itaiji}</div>

				</div>
				<div class="modal_anim_container">
					<div id="kanji_animation">
						<div id="kai_bg"></div>
						<div id="kai"></div>
					</div>
				</div>
			</div>
			<div class="modal_main">
				<p class="modal_separator">音読み</p>
				<p class="modal_onyomi">${Kanji.list[pIndex].onYomi != "" ? Kanji.list[pIndex].onYomi : "<span class='no_yomi'>&nbsp-</span>"}</p>
				<p class="modal_separator">訓読み</p>
				<p class="modal_kunyomi">${Kanji.list[pIndex].kunYomi != "" ? Kanji.list[pIndex].kunYomi : "<span class='no_yomi'>&nbsp-</span>"}</p>
				<p class="modal_separator">意味</p>
				<p class="modal_imi">${Kanji.list[pIndex].imi}</p>
				<p class="modal_separator">単語・熟語</p>
				<div class="modal_words">
	`;

	let no_border = ""
	Kanji.list[pIndex].wordList.forEach((i,index) => {
		if (index == Kanji.list[pIndex].wordList.length-1) no_border = "no_border";
		html +=
		`
		<div class="word_result ${no_border}" id="word_id_${i}">
			<div class="word_result_yomi_word">
				<div class="word_result_yomi">${Word.list[i].yomi}</div>
				<div class="word_result_word">${Word.list[i].word}</div>
				<div class="word_result_imi">${Word.list[i].imi}</div>
			</div>
		</div>
		`;
	})
	html +=
	`
					</div>
				</div>
			<!--</div>-->
		</div>
	`;

	modal_container.innerHTML = html;

	

	id("modal").addEventListener("click", e => {
		// log("CLICK MODAL");
		e.stopPropagation();
	});
	openModal();
	test(pIndex);

}

stop_search_btn.addEventListener("click", e => {
	log("stop_search_btn click"); // 1
	none(stop_search_btn);
	unset(search_btn);
	search_input.value = "";
	e.preventDefault();
	e.stopPropagation();
});

document.body.addEventListener("click", e => {
	log(e.target);
	// log("click body"); //2
	if (bSearching) {
		// log("go stop searching"); //3
		unset(search_btn);
		none(stop_search_btn);
	} else {
		// log("no action");
	}
});

modal_container.addEventListener("click", e => {
	// log("Click modal container");
	if (bModal) closeModal();
});

function openModal() {
	bModal = true;
	bModalOpened = true;
	flex(id("modal_container"));
	setTimeout(() => {
		editClass(id("modal_container"), "modal_open");
	},0.1);

	editClass(id("span_1"), "span_1_arrow");
	editClass(id("span_3"), "span_3_arrow");
}
function closeModal() {
	bModal = false;
	modal_container.innerHTML = "";
	none(modal_container);
	editClass(modal_container, "modal_open", false);
	pathList = null;

	editClass(id("span_1"), "span_1_arrow", false);
	editClass(id("span_3"), "span_3_arrow", false);
}

function footerMainBtn() {
	if (bModal) {
		closeModal();
	} else {
		//TODO
	}
}

setInterval(() => {

	if (pathList !== null) {
		if (currentIndex == 0) {
			pathList.forEach(path => {
				const length = path.getTotalLength();
				path.style.transition = path.style.WebkitTransition = "none";
				path.style.strokeDasharray = length + " " + length;
				path.style.strokeDashoffset = length;
			});
		}
		
		const path = pathList[currentIndex];
		const length = path.getTotalLength();
		path.style.transition = path.style.WebkitTransition = "none";
		
		path.style.strokeDasharray = length + " " + length;
		path.style.strokeDashoffset = length;
		
		path.getBoundingClientRect();
		
		path.style.transition = path.style.WebkitTransition = "stroke-dashoffset 0.2s ease-in-out";
		
		path.style.strokeDashoffset = "0";
	
		currentIndex++;
		if (currentIndex >= pathList.length) {
			currentIndex = 0;
		}
	}
	
}, 500);



function test(pId) {
	log(Kanji.list);
	log(Kanji.list[pId]);
	
	if (Kanji.list.length > 0 && Kanji.list[pId].pathList.length > 0) {
		let innerHTML = `<svg width="75" height="75" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" version="1.1" baseProfile="full">`;
		Kanji.list[pId].pathList.forEach(p => {
			innerHTML += `<path d="${p}" style="fill:none;stroke:rgba(220,220,220,1);stroke-width:5" />`
		});
		innerHTML += `</svg>`;
	
		let innerHTML2 = `<svg width="75" height="75" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" version="1.1" baseProfile="full">`;
		Kanji.list[pId].pathList.forEach(p => {
			innerHTML2 += `<path d="${p}" style="fill:none;stroke:rgba(0 118 188);stroke-width:5" />`
		});
		innerHTML2 += `</svg>`;
	
		let kai_bg = id("kai_bg");
		kai_bg.innerHTML = innerHTML;
		let kai = id("kai");
		kai.innerHTML = innerHTML2;

		pathList = document.querySelectorAll("#kai path");
		pathList.forEach(path => {
			const length = path.getTotalLength();
			path.style.transition = path.style.WebkitTransition = "none";
			path.style.strokeDasharray = length + " " + length;
			path.style.strokeDashoffset = length;
		});
		currentIndex = 0;
	}
}

function changeSection(pSection) {
	switch(pSection) {
		case "main":
			unset(main_section);
			none(training_section);
			// editClass(main_button, "header_btn_active", true);
			editClass(training_button, "header_btn_active", false);
			// training_button.style.borderLeft = "2px solid rgba(0 118 188)";
			unset(id("footer_zone"));
			break;
		case "training":
			none(main_section);
			unset(training_section);
			// editClass(main_button, "header_btn_active", false);
			editClass(training_button, "header_btn_active", true);
			none(id("footer_zone"));
			break;
	}
	currentSection = pSection;
}

function displayKanjiUrl() {
	if (kanji_id > 0) {
		test(kanji_id);
	}
}



// ----------------------------------------
// UTILS ----------------------------------
// ----------------------------------------

function editClass(e, pClass, pAdd = true) {
    if (pAdd) {
        e.classList.add(pClass);
    } else {
        e.classList.remove(pClass);
    }
}
function emptyInput() {
    let inputList = document.querySelectorAll("input");
    inputList.forEach(i => {
        i.value = "";
    });
}
function id(pId) {
    return document.getElementById(pId);
}
function none(element) {
    element.style.display = "none";
}
function unset(element) {
	element.style.display = "unset";
}
function flex(element) {
    element.style.display = "flex";
}
function block(element) {
    element.style.display = "block";
}
function rnd(pMin, pMax) {
    return Math.floor(Math.random() * ((pMax+1) - pMin)) + pMin;
}
function copyToClipboard(pString) {
	navigator.clipboard.writeText(pString);
}

function createPath(content) {
	let kanji = "";
	for (let i = 0; i < content.length; i++) {
		if (content[i] == "<" && content[i+1] == "k" && content[i+2] == "a") { //? <ka => <kanji ... >
			let bFirstG = false;
			let j = i+1;
			while (bFirstG == false) {
				if (content[j] == "<" && content[j+1] == "g") {
					bFirstG = true;
				}
				j++;
			}
			kanji += "\n" + content[j+30] + "";
		} else {
			if (content[i] == "<" && content[i+1] == "p" && content[i+2] == "a" && content[i+3] == "t" && content[i+4] == "h") {

				let bPathD = false;
				let j = i;
				let pathStartIndex = 0;
				while (!bPathD) {
					if (content[j] == " " && content[j+1] == "d" && content[j+2] == "=") {
						pathStartIndex = j+4;
						bPathD = true;
					}
					j++;
				}

				let bFound = false;
				j = i;
				while (bFound == false) {
					if (content[j] == ">") {
						bFound = true;
						kanji += content.slice(pathStartIndex, j-2);
						kanji += ";";
					}
					j++;
				}
			}
		}
	}
}



// function addPath() {
// 	let test = content.split("\n");
// 	log(test);
// 	let final = "";
// 	Kanji.list.forEach(k => {
// 		test.forEach(t => {
// 			if (t[0] == k.kanji) {
// 				final += t.slice(1, t.length) + "\n";
// 			}
// 		});
// 	});
// 	log(final);
// }