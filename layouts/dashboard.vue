<template>
    <v-app>
        <v-card color="dashboard_bg" class="dl__main_card">


            <!-- *** SIDE NAVIGATION BAR *** -->

            
            <v-navigation-drawer class="dl__drawer" color="navbar_bg" v-model="drawer" :mini-variant.sync="mini" permanent v-if="drawer==true">
                
                <!-- LOGO -->
                <v-list-item class="dl__brand_container">
                    <div class="dl__brand_wrap" :class="{'d-none':mini}">
                        <v-list-item-title class="dl__brand_logo">
                           <AccountingLogo />
                        </v-list-item-title>
                    </div>
                </v-list-item>

                <!-- LIST -->
                <v-list class="dl__list">
                    <div class="dl__list_div" v-for="(value, index) in items" :key="index">
                        <p class="dl__drawer_topic_link text--text" :class="{'d-none':mini}">{{ value.group }}</p>
                        <v-list-item class="dl__list_item"  v-for="(link,linkindex) in value.links" :key="linkindex" link :to="link.route" @click="handleLinks(link)">
                            <v-list-item-icon class="dl__drawer_list_icon" :class="{mr_0:mini}">
                                <div v-if="link.text == 'Dashboard'" :class="SideNavMaskerValue == 'Dashboard'?'dashboard':''" >
                                    <DB_SideNavMasker v-show="SideNavMaskerValue == 'Dashboard'" class="side_nav__masker" />
                                    <DashboardIcon  class="side_nav_icons" />
                                </div>
                                <div v-if="link.text == 'Sales'" :class="SideNavMaskerValue == 'Sales'?'sales':''">
                                    <SAL_SideNavMasker v-show="SideNavMaskerValue == 'Sales'"   class="side_nav__masker" />
                                    <SalesIcon class="side_nav_icons"/>
                                </div>
                                <div v-if="link.text == 'Expenses'" :class="SideNavMaskerValue == 'Expenses'?'Expenses':''">
                                    <EXP_SideNavMasker v-show="SideNavMaskerValue == 'Expenses'" class="side_nav__masker" />
                                    <ExpensesIcon class="side_nav_icons"/>
                                </div>
                                <div v-if="link.text == 'Chart of Accounts'" :class="SideNavMaskerValue == 'Chart of Accounts'?'ChartofAccounts':''">
                                    <COA_SideNavMasker v-show="SideNavMaskerValue == 'Chart of Accounts'" class="side_nav__masker" />
                                    <ChartOfAccountsIcon class="side_nav_icons"/>
                                </div>
                                <div v-if="link.text == 'Reports'" :class="SideNavMaskerValue == 'Reports'?'Dashboard':''">
                                    <DB_SideNavMasker v-show="SideNavMaskerValue == 'Reports'" class="side_nav__masker" />
                                    <ReportsIcon  class="side_nav_icons" />
                                </div>
                                <div v-if="link.text == 'Banking'" :class="SideNavMaskerValue == 'Banking'?'Sales':''">
                                    <SAL_SideNavMasker v-show="SideNavMaskerValue == 'Banking'" class="side_nav__masker" />
                                    <BankingIcon   class="side_nav_icons"/>
                                </div>
                                <div v-if="link.text == 'Customers'" :class="SideNavMaskerValue == 'Customers'?'Customers':''">
                                    <CUS_SideNavMasker v-show="SideNavMaskerValue == 'Customers'" class="side_nav__masker" />
                                    <CustomersIcon  class="side_nav_icons" />
                                </div>
                                <div v-if="link.text == 'Alerts'" :class="SideNavMaskerValue == 'Alerts'?'Expenses':''">
                                    <EXP_SideNavMasker v-show="SideNavMaskerValue == 'Alerts'" class="side_nav__masker" />
                                    <AlertsIcon  class="side_nav_icons" />
                                </div>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title class="dl_drawer_link subtext--text" color="text">{{ link.text }}</v-list-item-title>              
                            </v-list-item-content>
                        </v-list-item>
                    </div>
                </v-list>

                <v-spacer class="spacer small_spacer "></v-spacer>
                <!-- FOOTER -->
                <div class="dl__side_footer">
                    <div class="dl__side_footer_brand_wrap" :class="{'d-none':mini}">
                        <PoweredByIcon />
                    </div>
                    <div class=" pb-0 ">
                        <v-btn class="miniClose" icon @click.stop="mini = !mini" small>
                        <v-icon v-if="mini==true" color="text" small>fa-chevron-right</v-icon>
                        <v-icon v-else color="text" small>fa-chevron-left</v-icon>
                        </v-btn>
                        <!-- <v-btn class="closeDrawerOnMobileBtn" icon @click="drawer = !drawer">
                            <v-icon color="text">fa-chevron-left</v-icon>
                        </v-btn> -->
                    </div>
                </div>
            </v-navigation-drawer>


            <!-- *** TOP NAVIGATION BAR *** -->


            <main class="dl__main">
                <div class="dl__headNav" :class=" bg==true ? 'white' : 'white' ">
                    
                    <!-- FIRST ROW -->
                    <div class="dl__header flex_row">
                        
                        <!-- MOBILE OPEN NAV BTN -->
                            <!-- <v-btn class="openDrawerOnMobileBtn" icon @click="openDrawerOnMobileBtn">
                            <v-icon color="text">fa-chevron-right</v-icon>
                            </v-btn> -->
                        <!-- / MOBILE OPEN NAV BTN -->


                        <!-- DIV-1 -->
                            <!-- DATE + PAGE NAME -->
                            <div class="dn__header flex_column">
                                <p v-if="$nuxt.$route.name == 'dashboard'" class="subtext--text ma-0 pa-0">Sunday, August 16</p>
                                <h2 v-if="$nuxt.$route.name != 'dashboard'" class="text--text ma-0 pa-0">{{ $nuxt.$route.name }}</h2>
                            </div>
                            <!-- / DATE + PAGE NAME -->



                            <!-- TABS -->
                            <div class="tabs__header_con">
                                <HeaderTabs @tabValue="handleTabValue($event)" v-if="$nuxt.$route.name == 'sales'" :data="tabs_data.sales" />
                                <HeaderTabs v-if="$nuxt.$route.name == 'expenses'" :data="tabs_data.expenses" />
                            </div>
                            <!-- / TABS -->

                            <v-spacer></v-spacer>



                            <!-- ACTION BUTTONS -->
                            <div class="dl__header_actions flex_row">
                                <ThemeIcon class="them_icon" @click.stop="toggleTheme"/>
                                <ReloadIcon class="them_icon" @click.stop="refresh" />
                                <v-btn
                                class="tall__btn"
                                color="primary"
                                outlined
                                >
                                <div class="flex_row justify-space-around">
                                    <span class="n_text text--text mx-2">Privacy Mode</span>
                                    <PrivacyIcon />
                                </div>
                                </v-btn>
                                <AccountsDropDownMenu :accounts="accounts" />
                            </div>
                            <!-- / ACTION BUTTONS -->

                        <!-- / DIV-1 -->
                    </div>

                    <!-- SECOND ROW -->
                    <div v-if="$nuxt.$route.name == 'dashboard'">
                        <CardWithIcon :data="balance_cards" />
                    </div>

                </div>
                <div class="dl__content">
                <Nuxt />
                </div>
            </main>
        </v-card>
    </v-app>
</template>

<script>
import '@/assets/scss/layouts/_dashboardLayout.scss'

import DB_SideNavMasker from '@/assets/images/DashboardLayout/SideNavMasker/Dashboard.svg'
import SAL_SideNavMasker from '@/assets/images/DashboardLayout/SideNavMasker/Sales.svg'
import EXP_SideNavMasker from '@/assets/images/DashboardLayout/SideNavMasker/Expenses.svg'
import COA_SideNavMasker from '@/assets/images/DashboardLayout/SideNavMasker/ChartOfAccounts.svg'
import CUS_SideNavMasker from '@/assets/images/DashboardLayout/SideNavMasker/Customers.svg'

import DashboardIcon from '@/assets/images/DashboardLayout/Dashboard-icon.svg'
import SalesIcon from '@/assets/images/DashboardLayout/Sales-icon.svg'
import ExpensesIcon from '@/assets/images/DashboardLayout/Expenses-icon.svg'
import ChartOfAccountsIcon from '@/assets/images/DashboardLayout/ChartOfAccounts-icon.svg'
import ReportsIcon from '@/assets/images/DashboardLayout/Reports-icon.svg'
import BankingIcon from '@/assets/images/DashboardLayout/Banking-icon.svg'
import CustomersIcon from '@/assets/images/DashboardLayout/Customers-icon.svg'
import AlertsIcon from '@/assets/images/DashboardLayout/Alerts-icon.svg'
import SupportIcon from '@/assets/images/DashboardLayout/Support-icon.svg'
import SettingsIcon from '@/assets/images/DashboardLayout/Settings-icon.svg'

import AccountingLogo from '@/assets/images/DashboardLayout/Accounting-logo.svg'
import PoweredByIcon from '@/assets/images/DashboardLayout/PoweredBy-icon.svg'
import ThemeIcon from '@/assets/images/DashboardLayout/Theme-icon.svg'
import ReloadIcon from '@/assets/images/DashboardLayout/Reload-icon.svg'
import PrivacyIcon from '@/assets/images/DashboardLayout/Privacy-icon.svg'

import AccountsDropDownMenu from '@/components/Layout/AccountsDropDownMenu/index.vue'
import HeaderTabs from '@/components/Layout/HeaderTabs/index.vue'
import CardWithIcon from '@/components/Cards/CardWithIcon/index.vue'



export default {
    name: 'dashboard',
    components: {
        DB_SideNavMasker ,
        SAL_SideNavMasker,
        EXP_SideNavMasker,
        COA_SideNavMasker,
        CUS_SideNavMasker,
        AccountingLogo,
        DashboardIcon,
        AlertsIcon,
        BankingIcon,
        ChartOfAccountsIcon,
        CustomersIcon,
        ExpensesIcon,
        PoweredByIcon,
        ReportsIcon,
        SalesIcon,
        SettingsIcon,
        SupportIcon,
        ReloadIcon,
        ThemeIcon,
        PrivacyIcon,
        AccountsDropDownMenu,
        HeaderTabs,
        CardWithIcon,
    },
    data() {
        return {
            tab_current_val: 'all',
            tabs_data: {
                sales: [
                    { title: 'All Sales', value: 'all' },
                    { title: 'Invoices', value: 'invoices' },
                    { title: 'Products/Services', value: 'products' },
                    { title: 'Forecast', value: 'forecast' },
                ],
                expenses: [
                    { title: 'All Expenses', value: 'all' },
                    { title: 'Suppliers', value: 'suppliers' },
                    { title: 'Forecast', value: 'forecast' },
                    { title: 'Expense Breakdown', value: 'breakdown' },
                    { title: 'Reimbursement', value: 'reimbursement' },
                ],
            },
            bg: true,
            balance_cards: [
                { name: 'EmiratesNBD', amount: '58,45,652', color: 'yellow' },
                { name: 'Dubai Islamic', amount: '65,78,563', color: 'green' },
                { name: 'RAK Bank', amount: '78,58,522.0', color: 'blue' },
                { name: 'ADCB Bank', amount: '12,45,125', color: 'purple' },
            ],
            SideNavMaskerValue: 'Dashboard',
            drawer: true,
            mini: false,
            items: [
                {
                group: 'MENU',
                links: [
                    {
                    text: 'Dashboard',
                    icon: 'DashboardIcon',
                    iconsrc: '@/assets/images/DashboardLayout/Dashboard-icon.svg',
                    marker: 'DB_SideNavMasker',
                    route: '/dashboard'
                    },
                    {
                    text: 'Sales',
                    icon: 'SalesIcon',
                    iconsrc: '@/assets/images/DashboardLayout/Dashboard-icon.svg', 
                    marker: 'SAL_SideNavMasker',
                    route: '/sales'
                    },
                    {
                    text: 'Expenses',
                    icon: 'ExpensesIcon',
                    iconsrc: '@/assets/images/DashboardLayout/Dashboard-icon.svg',
                    marker: 'EXP_SideNavMasker',
                    route: '/expenses'
                    },
                    {
                    text: 'Chart of Accounts',
                    icon: 'ChartOfAccountsIcon',
                    iconsrc: '@/assets/images/DashboardLayout/Dashboard-icon.svg',
                    marker: 'COA_SideNavMasker',
                    route: '/chartofaccounts'
                    },
                    {
                    text: 'Reports',
                    icon: 'ReportsIcon',
                    iconsrc: '@/assets/images/DashboardLayout/Dashboard-icon.svg',
                    marker: 'DB_SideNavMasker',
                    route: '/reports'
                    },
                    {
                    text: 'Banking',
                    icon: 'BankingIcon',
                    iconsrc: '@/assets/images/DashboardLayout/Dashboard-icon.svg',
                    marker: 'SAL_SideNavMasker',
                    route: '/banking'
                    },
                    {
                    text: 'Customers',
                    icon: 'CustomersIcon',
                    iconsrc: '@/assets/images/DashboardLayout/Dashboard-icon.svg',
                    marker: 'CUS_SideNavMasker',
                    route: '/customers'
                    },
                    {
                    text: 'Alerts',
                    icon: 'AlertsIcon',
                    iconsrc: '@/assets/images/DashboardLayout/Dashboard-icon.svg',
                    marker: 'EXP_SideNavMasker',
                    route: '/alerts'
                    },
                ]
                },
            ],
            accounts: [
                { name: 'Account One'},
                { name: 'Account Two'},
                { name: 'Account Three'},
                { name: 'Add New'},
            ],
        }
    },
    methods: {
        handleTabValue(payload) {
            
            console.log("Emitted Value from HeaderTabs Component  ==> ", payload)
            
            // Setting the payload value
            this.tab_current_val = payload

            // Setting the payload value in the localStorage under name selected_tab
            localStorage.setItem("selected_tab", payload);

            // Emitting an event call tabChanged with the tab current value
            this.$nuxt.$emit("tabChanged" ,payload)

        },
        handleLinks(value) {
            this.SideNavMaskerValue = value.text
        },
        refresh() {
            console.log('page refreshed...')
        },
        toggleTheme() {
            this.$vuetify.theme.dark = !this.$vuetify.theme.dark
            this.bg = !this.bg;
        }
    },
}
</script>