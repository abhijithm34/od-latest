import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Card,
  CardContent,
  Grid,
  Chip,
  Divider,
  Alert,
  AlertTitle
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  School as SchoolIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
  ArrowForward as ArrowForwardIcon,
  Book as BookIcon,
  Help as HelpIcon,
  Security as SecurityIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const GuideMe = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const studentGuide = [
    {
      title: "How to Submit an OD Request",
      steps: [
        "Navigate to 'New OD Request' from your dashboard",
        "Fill in all required fields: Event details, dates, and purpose",
        "Upload supporting documents (brochures, certificates, etc.)",
        "Review your information before submitting",
        "Submit the request and wait for approval"
      ]
    },
    {
      title: "Required Documents",
      items: [
        "Event brochure or invitation letter",
        "Registration certificate (if applicable)",
        "Any other relevant supporting documents"
      ]
    },
    {
      title: "Tracking Your Request",
      steps: [
        "Go to 'My OD Requests' to view all your submissions",
        "Check the status: Pending, Approved, or Rejected",
        "View comments from faculty/HOD if any",
        "Download approved OD letters"
      ]
    }
  ];

  const facultyGuide = [
    {
      title: "Reviewing Student Requests",
      steps: [
        "Access 'OD Requests Management' from your dashboard",
        "View pending requests assigned to you",
        "Review student details and supporting documents",
        "Approve, reject, or add comments",
        "Forward approved requests to HOD for final approval"
      ]
    },
    {
      title: "Approval Criteria",
      items: [
        "Verify event authenticity and relevance",
        "Check if dates don't conflict with academic schedule",
        "Ensure proper documentation is provided",
        "Consider student's academic performance"
      ]
    }
  ];

  const hodGuide = [
    {
      title: "Final Approval Process",
      steps: [
        "Review requests forwarded by faculty",
        "Check faculty recommendations and comments",
        "Verify all documentation and approvals",
        "Make final decision: Approve or Reject",
        "Generate OD letters for approved requests"
      ]
    },
    {
      title: "Department Oversight",
      items: [
        "Monitor overall OD request patterns",
        "Ensure compliance with institutional policies",
        "Maintain records for audit purposes",
        "Coordinate with other departments if needed"
      ]
    }
  ];

  const adminGuide = [
    {
      title: "System Administration",
      steps: [
        "Manage user accounts and roles",
        "Configure system settings and policies",
        "Monitor system performance and usage",
        "Generate reports and analytics",
        "Handle technical issues and support"
      ]
    },
    {
      title: "User Management",
      items: [
        "Create and manage faculty accounts",
        "Assign roles and permissions",
        "Reset passwords and handle account issues",
        "Maintain user directory"
      ]
    }
  ];

  const generalTips = [
    "Always keep your login credentials secure",
    "Log out when using shared computers",
    "Save your work frequently when filling forms",
    "Contact your department coordinator for urgent requests",
    "Keep copies of all submitted documents",
    "Check your email for notifications and updates"
  ];

  const renderRoleSpecificGuide = () => {
    if (!user) return null;

    switch (user.role) {
      case 'student':
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SchoolIcon color="primary" />
              Student Guide
            </Typography>
            {studentGuide.map((section, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    {section.title}
                  </Typography>
                  {section.steps ? (
                    <List dense>
                      {section.steps.map((step, stepIndex) => (
                        <ListItem key={stepIndex}>
                          <ListItemIcon>
                            <CheckCircleIcon color="success" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={step} />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <List dense>
                      {section.items.map((item, itemIndex) => (
                        <ListItem key={itemIndex}>
                          <ListItemIcon>
                            <InfoIcon color="info" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={item} />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        );
      case 'faculty':
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PersonIcon color="primary" />
              Faculty Guide
            </Typography>
            {facultyGuide.map((section, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    {section.title}
                  </Typography>
                  {section.steps ? (
                    <List dense>
                      {section.steps.map((step, stepIndex) => (
                        <ListItem key={stepIndex}>
                          <ListItemIcon>
                            <CheckCircleIcon color="success" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={step} />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <List dense>
                      {section.items.map((item, itemIndex) => (
                        <ListItem key={itemIndex}>
                          <ListItemIcon>
                            <InfoIcon color="info" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={item} />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        );
      case 'hod':
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AdminIcon color="primary" />
              HOD Guide
            </Typography>
            {hodGuide.map((section, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    {section.title}
                  </Typography>
                  {section.steps ? (
                    <List dense>
                      {section.steps.map((step, stepIndex) => (
                        <ListItem key={stepIndex}>
                          <ListItemIcon>
                            <CheckCircleIcon color="success" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={step} />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <List dense>
                      {section.items.map((item, itemIndex) => (
                        <ListItem key={itemIndex}>
                          <ListItemIcon>
                            <InfoIcon color="info" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={item} />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        );
      case 'admin':
        return (
          <Box>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AdminIcon color="primary" />
              Administrator Guide
            </Typography>
            {adminGuide.map((section, index) => (
              <Card key={index} sx={{ mb: 2 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom color="primary">
                    {section.title}
                  </Typography>
                  {section.steps ? (
                    <List dense>
                      {section.steps.map((step, stepIndex) => (
                        <ListItem key={stepIndex}>
                          <ListItemIcon>
                            <CheckCircleIcon color="success" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={step} />
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <List dense>
                      {section.items.map((item, itemIndex) => (
                        <ListItem key={itemIndex}>
                          <ListItemIcon>
                            <InfoIcon color="info" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText primary={item} />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <HelpIcon color="primary" sx={{ fontSize: 40 }} />
          <Typography variant="h4" component="h1" gutterBottom>
            Guide Me
          </Typography>
        </Box>

        <Alert severity="info" sx={{ mb: 3 }}>
          <AlertTitle>Welcome to the OD Application Guide!</AlertTitle>
          This comprehensive guide will help you understand how to use the On Duty application system effectively.
        </Alert>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            {user ? (
              renderRoleSpecificGuide()
            ) : (
              <Alert severity="warning">
                Please log in to view role-specific guidance.
              </Alert>
            )}

            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} sx={{ mt: 3 }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <BookIcon color="primary" />
                  General Tips & Best Practices
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <List dense>
                  {generalTips.map((tip, index) => (
                    <ListItem key={index}>
                      <ListItemIcon>
                        <InfoIcon color="info" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={tip} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <SecurityIcon color="primary" />
                  Security Guidelines
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body2" paragraph>
                  <strong>Account Security:</strong>
                </Typography>
                <List dense>
                  <ListItem>
                    <ListItemIcon>
                      <WarningIcon color="warning" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Never share your login credentials with others" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <WarningIcon color="warning" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Always log out when using shared computers" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <WarningIcon color="warning" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Use strong passwords and change them regularly" />
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <WarningIcon color="warning" fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Report any suspicious activity immediately" />
                  </ListItem>
                </List>
              </AccordionDetails>
            </Accordion>

            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <AssignmentIcon color="primary" />
                  Request Status Meanings
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Chip 
                      label="Pending" 
                      color="warning" 
                      variant="outlined" 
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="body2" paragraph>
                      Your request is under review by faculty/HOD
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Chip 
                      label="Approved" 
                      color="success" 
                      variant="outlined" 
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="body2" paragraph>
                      Your request has been approved and OD letter is available
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Chip 
                      label="Rejected" 
                      color="error" 
                      variant="outlined" 
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="body2" paragraph>
                      Your request has been rejected. Check comments for details
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Chip 
                      label="Under Review" 
                      color="info" 
                      variant="outlined" 
                      sx={{ mb: 1 }}
                    />
                    <Typography variant="body2" paragraph>
                      Your request is being processed by the system
                    </Typography>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card sx={{ position: 'sticky', top: 20 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ArrowForwardIcon color="primary" />
                  Quick Actions
                </Typography>
                <Divider sx={{ my: 2 }} />
                
                {user && (
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate('/dashboard')}
                      fullWidth
                    >
                      Go to Dashboard
                    </Button>
                    
                    {user.role === 'student' && (
                      <>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => navigate('/student/od-request')}
                          fullWidth
                        >
                          Submit OD Request
                        </Button>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => navigate('/student/my-requests')}
                          fullWidth
                        >
                          View My Requests
                        </Button>
                      </>
                    )}
                    
                    {user.role === 'faculty' && (
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => navigate('/faculty/od-requests')}
                        fullWidth
                      >
                        Manage Requests
                      </Button>
                    )}
                    
                    {user.role === 'hod' && (
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => navigate('/hod/dashboard')}
                        fullWidth
                      >
                        HOD Dashboard
                      </Button>
                    )}
                    
                    {user.role === 'admin' && (
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => navigate('/admin/dashboard')}
                        fullWidth
                      >
                        Admin Dashboard
                      </Button>
                    )}
                  </Box>
                )}
                
                {!user && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/login')}
                    fullWidth
                  >
                    Login to Continue
                  </Button>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default GuideMe; 