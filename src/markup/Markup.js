import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from './Pages/Homepage1';
import Jobprofile from './Pages/Jobprofile';
import CurrentJobOpenings from './Pages/CurrentJobOpenings';
import Companyresume from './Pages/Companyresume';
import Componypostjobs from './Pages/Componypostjobs';
import Companymanage from './Pages/Companymanage';
import Aboutus from './Pages/Aboutus';
import Jobdetail from './Pages/Jobdetail';
import Browsejoblist from './Pages/Browsejoblist';
import Register2 from './Pages/Register2';
import Contact from './Pages/Contact';
import ScrollToTop from './Element/ScrollToTop';
import Loginpage2 from './Pages/Loginpage2';
import JobsApplied from './Pages/jobsapplied';
import ComponyUpdatePost from './Pages/CompanyUpdatePost';
import CompanyViewJob from './Pages/CompanyViewJob';

const Markup= () => {
	return(
		<>
			<div className="page-wraper">
				<Switch>
					<Route path='/' exact component={Homepage} />
					<Route path='/jobs-profile' exact component={Jobprofile} />
					<Route path='/jobs-current-openings' exact component={CurrentJobOpenings} />
					<Route path='/jobs-applied' exact component={JobsApplied} />
					<Route path='/company-resume' exact component={Companyresume} />
					<Route path='/company-post-jobs' exact component={Componypostjobs} />
					<Route path='/company-manage-job' exact component={Companymanage} />
					<Route path='/company-update-job/:jobId' exact component={ComponyUpdatePost} />
					<Route path='/about-us' exact component={Aboutus} />
					<Route path='/job-detail/:id' exact component={Jobdetail} />
					<Route path='/job-view/:jobId' exact component={CompanyViewJob} />
					<Route path='/browse-job-list' exact component={Browsejoblist} />
					<Route path='/login' exact component={Loginpage2 } />
					<Route path='/register-2' exact component={Register2} />
					<Route path='/contact' exact component={Contact} />	
				</Switch>
			</div>
			<ScrollToTop />
		</>	
	)
	
	
}

export default Markup;