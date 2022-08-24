import React, {useEffect} from 'react';
import Button from 'react-bootstrap/Button'
import Roulette from './roulette'
import Blackjack from './blackjack'
import Slot from './slot'
import Craps from './craps'
import { game_page } from '../../actions/actions';
import { useDispatch } from 'react-redux'

function Game(props){
	let info = props.info;
	let dispatch = useDispatch();	

	useEffect(() => {
		dispatch(game_page('game'));
	}, []); 

	function handleBack(){
		let url = window.location.href;
		url = url.split('/table/');
		window.location.href = url[0];
	}
	
	return (
		<div className="color_yellow">
			{props.info.user ? (
				<div className="casino_container color_yellow">
					{(() => {
						switch (props.info.game) {
							case "roulette":
								return (
									<Roulette lang={props.lang} info={info} socket={props.socket}></Roulette>
								)
							case "blackjack":
								return (
									<Blackjack lang={props.lang} info={info} socket={props.socket}></Blackjack>
								)	
							case "slots":
								return (
									<Slot lang={props.lang} info={info} socket={props.socket}></Slot>
								)
							case "craps":								
								return (
									<Craps lang={props.lang} info={info} socket={props.socket}></Craps>
								)
							default:
								return(
									<div>
										{props.lang === "ro" ? 
											<>
												<p>Eroare</p>
												<Button className="button_table shadow_convex" type="button" onClick={handleBack}>Inapoi</Button>
											</> : 
											<>
												<p>Somethig went wrong</p>
												<Button className="button_table shadow_convex" type="button" onClick={handleBack}>Back</Button>
											</>
										}														
									</div>
								)						
						}
					})()}
				</div>
			) : (
				<div>
					{props.lang === "ro" ? <span>Nu exista user</span> : <span>No user</span>}	
				</div>
			)}			
		</div>
	);
}

export default Game;