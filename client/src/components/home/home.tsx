import styles from './home.module.scss';
import classNames from 'classnames';
import { Navbar } from '../navbar/navbar';
import { Footer } from '../footer/footer';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import moment from "moment";


export interface HomeProps {
	className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/configuration-for-homes-and-templates
 */
export const Home = ({ className }: HomeProps) => {
	const [posts, setPosts] = useState<
		{
			username: string;
			title: string;
			desc: string;
			img: string;
			id: string;
			cat: string;
			liked: boolean;
			likes: number;
			date: string;
			userImg: string;

		}[]
	>([]);
	const [post, setPost] = useState({});

	const cat = useLocation().search;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(`/posts/${cat}`);
				setPosts(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchData();
	}, [cat]);

	const location = useLocation();
	const postId = location.pathname.split("/")[2];

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await axios.get(`/posts/${postId}`);
				setPost(res.data);
			} catch (err) {
				console.log(err);
			}
		};
		fetchData();
	}, [postId]);


	const navigate = useNavigate();


	const getText = (html: string, maxLength: number) => {
		const doc = new DOMParser().parseFromString(html, "text/html");
		const textContent = doc.body.textContent || "";
		if (textContent.length <= maxLength) {
			return textContent;
		} else {
			return textContent.substring(0, maxLength) + "...";
		}
	};

	const formatCategoryName = (category: any) => {
		if (category === 'healthyfood') {
			return 'Healthy Food';
		} else if (category === 'intfood') {
			return 'International Food';
		} else if (category.match(/[A-Z]/)) {
			const words = category.split(/(?=[A-Z])/);
			const formattedName = words.map((word: any) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
			return formattedName;
		} else {
			return category.charAt(0).toUpperCase() + category.slice(1);
		}

	};

	const currentCat = cat.split("=")[1]

	return (
		<div className={classNames(styles.root, className)}>
			<Navbar />
			<div className={styles.content}>
				<h1 className={styles.header}>Tasting, Rating, Reviewing.</h1>
				<div className={styles.catHeader}>
					<Link to="/?cat=healthyfood" style={{ textDecoration: "none", color: "black", textAlign: "center" }}>
						<div className={currentCat == "healthyfood" ? styles.currentCat : styles.cats}>
							<img
								className={styles.catpics}
								src={
									'https://res.cloudinary.com/dgb2lnz2i/image/upload/v1683910827/cat1_vp2fcm.png'
								}
							/>
							<span className={styles.catgName}>Healthy Foods</span>
						</div>
					</Link>
					<Link to="/?cat=beverages" style={{ textDecoration: "none", color: "black", textAlign: "center" }}>
						<div className={currentCat == "beverages" ? styles.currentCat : styles.cats}>
							<img
								className={styles.catpics}
								src={
									'https://res.cloudinary.com/dgb2lnz2i/image/upload/v1683910827/cat2_uamldn.png'
								}
							/>
							<span className={styles.catgName}>Beverages</span>
						</div>
					</Link>
					<Link to="/?cat=snacks" style={{ textDecoration: "none", color: "black", textAlign: "center" }}>
						<div className={currentCat == "snacks" ? styles.currentCat : styles.cats}>
							<img
								className={styles.catpics}
								src={
									'https://res.cloudinary.com/dgb2lnz2i/image/upload/v1683910826/cat3_brdewz.png'
								}
							/>
							<span className={styles.catgName}>Snacks</span>
						</div>
					</Link>
					<Link to="/?cat=intfood" style={{ textDecoration: "none", color: "black", textAlign: "center" }}>
						<div className={currentCat == "intfood" ? styles.currentCat : styles.cats}>
							<img
								className={styles.catpics}
								src={
									'https://res.cloudinary.com/dgb2lnz2i/image/upload/v1683910827/cat4_ecg3an.png'
								}
							/>
							<span className={styles.catgName}>International Food</span>
						</div>
					</Link>
					<Link to="/?cat=specialty" style={{ textDecoration: "none", color: "black", textAlign: "center" }}>
						<div className={currentCat == "specialty" ? styles.currentCat : styles.cats}>
							<img
								className={styles.catpics}
								src={
									'https://res.cloudinary.com/dgb2lnz2i/image/upload/v1683910826/cat5_fesdtb.png'
								}
							/>
							<span className={styles.catgName}>Specialty</span>
						</div>
					</Link>
					<Link to="/?cat=restaurants" style={{ textDecoration: "none", color: "black", textAlign: "center" }}>
						<div className={currentCat == "restaurants" ? styles.currentCat : styles.cats}>
							<img
								className={styles.catpics}
								src={
									'https://res.cloudinary.com/dgb2lnz2i/image/upload/v1683910826/cat6_pgnmjp.png'
								}
							/>
							<span className={styles.catgName}>Restaurants</span>
						</div>
					</Link>
				</div>
				<div className={styles.posts11}>

					{posts.map((post) => (
						<div className={classNames(styles.cardpost, className)}>
							<Link to={`/post/${post.id}`} style={{ textDecoration: 'none', color: 'black' }}> <div className={styles.container}>
								<div className={styles.imgOverlay}>
									<FavoriteBorderOutlinedIcon sx={{ fontSize: 30, color: "white" }} />
									<span className={styles.imgOverlayText}>{post.likes}</span>
								</div>
								<img className={styles.imgclass}
									src={`../upload/${post.img}`}
								/>
								<div className={styles.contents}>
									<div className={styles.catContainer}>
										<span className={styles.cat}>{formatCategoryName(post.cat)}</span>
									</div>

									<span className={styles.title}>{post.title}</span>
									<p className={styles.content11}>
										{getText(DOMPurify.sanitize(post.desc), 100)}
									</p>

								</div>
								<div className={styles.user}>
									<img
										src={`../upload/${post.userImg}`}
										className={styles.profPic}
									/>
									<div className={styles.profInfo}>
										<span className={styles.username}>{post.username}</span>
										<span className={styles.time}>{moment(post.date).fromNow()}</span>
									</div>
								</div>
							</div>
							</Link>

						</div>


					))}
				</div>
			</div>

			<Footer />

		</div>
	);
};