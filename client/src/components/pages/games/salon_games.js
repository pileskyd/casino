import React from 'react';
import $ from 'jquery'; 

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import under_construction_icon from '../../img/icons/under_construction_icon.png'
import Carousel from '../carousel'

var self;
var socket;


class SalonGames extends React.Component {
	constructor(props) {
		super(props);
		self = this;
		socket = props.socket;	
		self.state = {
              info: props,
              width: window.innerWidth
		};
        self.handleDropdown = self.handleDropdown.bind(self);
        self.handleDropdown_small = self.handleDropdown_small.bind(self);
	}

    handleDropdown(t) {
		$('.casino_games_table_container').removeClass('open')
		$('.casino_games_table_container').each(function() {
			if($(this).attr('box') === t){
				$(this).addClass('open');
                var title = t.split('_').join(' ');
                $('.casino_games_title span').text(title);
                $('.casino_games_title_box_container').removeClass('open')
			}
		});
	}

    handleDropdown_small() {
		$('.casino_games_title_box_container').toggleClass('open');
        if($('.casino_games_title_box_container').hasClass('open')){
            $('.casino_games_title i').removeClass('fa-angle-down');
            $('.casino_games_title i').addClass('fa-angle-up');
        } else {
            $('.casino_games_title i').addClass('fa-angle-down');
            $('.casino_games_title i').removeClass('fa-angle-up');
        }
	}

    componentDidMount(){
        $(window).resize(function(){            
			self.setState({ width: window.innerWidth });
		});        
    }
	
	render(){
		return (
            <>
            <Row>
                <Col sm={2}></Col>
                <Col sm={8}>
                {(() => {
                    if (self.state.width < 960) {
                        $('.casino_games_table_container').removeClass('open');
                        $('.casino_games_table_container').eq(0).addClass('open')
                        return (
                            <div id="casino_games_title_dropdown_container">
                                <div onClick={()=>self.handleDropdown_small()} className="casino_games_title_container">
                                    <div className="capitalize casino_games_title shadow_convex">
                                        <span className="capitalize">roulette tables</span>
                                        <i className="fa fa-angle-down"></i>
                                    </div>
                                </div>                                
                                <div className="casino_games_title_box_container">
                                    <div className="casino_games_title_box">
                                        {
                                            self.state.info.casino_games_title.map(function(t, i){
                                                var title = t.split('_').join(' ');
                                                return(
                                                    <div key={i} className="capitalize" onClick={()=>self.handleDropdown(t)}>{title}</div>
                                                );
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    } 
                })()}
                </Col>
                <Col sm={2}></Col>
            </Row>
            <Row>
                <Col sm={2}></Col>
                <Col sm={8}>
                    {
                        self.state.info.casino_games_title.map(function(t, i){
                            var title = t.split('_').join(' ')
                            var box = "casino_games_table_container";
                            if(i === 0){
                                box = box + " open"
                            }

                            return(
                                <div key={i}>
                                    {(() => {
                                        if (self.state.width > 960) {
                                            return (
                                                <div className="casino_games_title_container">
                                                    <div className="capitalize casino_games_title shadow_convex" onClick={()=>self.handleDropdown(t)}>{title}</div>
                                                </div>
                                            )
                                        }
                                    })()}                                    
                                    <div box={t} className={box}>
                                        <div className="casino_games_table">
                                            {(() => {
                                                if (self.state.info.casino_games[t].length === 0) {
                                                    return (
                                                        <img className="under_construction_icon" alt="under construction" src={under_construction_icon} />
                                                    )
                                                } else {
                                                    return (
                                                        <Carousel template="salon" socket={socket} user={self.state.user} item_list={self.state.info.casino_games[t]}></Carousel>
                                                    )
                                                }
                                            })()}
                                        </div>
                                    </div>	
                                </div>													
                            )
                        })
                    }
                </Col>
                <Col sm={2}></Col>
            </Row>
        </>
		);
	};
}

export default SalonGames;