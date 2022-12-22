<template>
  <div class="">
    <v-card color='card_bg'  flat style="background-color: #f4f7f7">
      <v-row>

        
        <!-- LEFT SIDE -->
        <v-col
          sm="0"
          md="6"
          lg="6"
          class="d-none d-sm-none d-md-flex"
          id="ls__col"
        >
        <v-row class="py-9">
              <v-col cols="12" class="ls__con">
                <v-row style="min-height: 20% !important">
                  <v-col cols="4">
                      <div class="header__sec">
                        <v-img src="/nathandigital-slogo.svg" min-width="50" max-width="100"></v-img>
                        <v-divider vertical class="divider white"></v-divider>
                        <v-img src="/accountingtext.png" min-width="50" max-width="100" />
                      </div>
                  </v-col>
                </v-row>
                <v-spacer></v-spacer>
                <v-row  style="min-height: 20% !important">
                  <v-col cols="12" class="img__sec">
                    <v-img src="/Login/accounting-preview.png"></v-img>
                  </v-col>
                </v-row>
                <v-spacer></v-spacer>
                <v-row  style="min-height: 20% !important">
                  <v-col cols="12" class="text-center">
                    <h2 class="text_light--text">
                      Simple yet powerful accounting software for businesses
                    </h2> 
                    <p class="mt-5 subtitle subtext--text text-center">
                      Track expenses, customize invoices, run reports and even more all from one place.
                    </p>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
        </v-col>




        <!-- LOGIN CARD -->
        <v-col  sm="12" md="6" lg="6" id="rs" class="ma-auto text-center justify-center align-center d-flex flex-column">
          <v-card
            class="my-5 borderRadiusCards eventCard boxShadowCard"
            width="550"
            min-height="670"
          >
            <v-img
              class="eventCardImg"
              style="background: #505771"
              height="245"
              src="https://erp.nathanhr.com/login/bg-image.png"
            >
              <v-img
                width="180"
                height="100%"
                style="margin: auto"
                src="https://www.nathandigital.com/static/media/LogoLogo.c6dea5d239143387d7fe95dee7c1e554.svg"
                contain
              ></v-img>
            </v-img>
            <div class="curve-parent pa-xl-5">
              <div class="curve">
                <v-img
                  class="curveImage2"
                  width="70"
                  height="70"
                  src="/Login/lock-icon.svg"
                  contain
                ></v-img>
              </div>
              <v-form
                @submit.prevent="login"
                id="check-login-form"
                style="padding-top: 20px"
                v-if="!isForgotPassword"
              >
                <v-card-text class="pb-0 pt-7 pr-0 px-13">
                  <v-row>
                    <v-col cols="12" class="pl-0" style="text-align: start">
                      <p class="font-weight-medium fontSize15">Login</p>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-text class="py-0 px-13 my-0">
                  <p
                    class="
                      mb-0
                      text-left
                      font-weight-normal
                      grey-heading-text
                      textFontSize
                    "
                  >
                    User Name<span class="red--text">*</span>
                  </p>
                  <v-text-field
                    name="Username"
                    class="pt-0"
                    prepend-inner-icon="mdi-username"
                    placeholder="Username"
                    type="text"
                    v-model="email"
                  ></v-text-field>
                  <p
                    class="
                      mb-0
                      mt-3
                      text-left
                      font-weight-normal
                      grey-heading-text
                      textFontSize
                    "
                  >
                    Password<span class="red--text">*</span>
                  </p>
                  <v-text-field
                    class="pt-0"
                    id="password"
                    prepend-inner-icon="mdi-password"
                    name="password"
                    placeholder="Password"
                    :append-icon="
                      showPassword ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                    "
                    @click:append="showPassword = !showPassword"
                    :type="showPassword ? 'password' : 'text'"
                    v-model="password"
                  ></v-text-field>




                    <!-- AUTH ALERT -->
                    <!-- <v-alert
                    :value="isAuth"
                    outlined
                    style="border: solid 1px #e59b96; background-color: #fff6f5"
                    class="borderRadiusInfo align-center pa-3"
                    type="error"
                    transition="scale-transition"
                  >
                    {{ AuthErrMsg }}
                  </v-alert> -->




                  <!-- FORGET PASSWORD LINK -->
                  <p class="mb-0 text-right">
                    <a
                      href="#"
                      style="text-decoration: none"
                      class="
                        ml-2
                        font-weight-normal
                        fontSize15
                        grey-heading-text
                      "
                      @click.prevent="clickForgotPassword"
                      >Forgot Password?</a
                    >
                  </p>
                </v-card-text>
                <v-card-actions class="px-13 mt-4 mb-5">
                    <v-btn
                      type="submit"
                      block
                      to="/dashboard"
                      form="check-login-form"
                      style="min-height: 51px; justify-content: space-between"
                      class="
                        buttonBackgroundShade
                        borderRadiusInfo
                        pl-5
                        textTransformUnset
                      "
                      ><span class="white--text">Login</span
                      ><v-icon color="#fff" class="mx-4"
                        >fa-chevron-right</v-icon
                      >
                    </v-btn>
                </v-card-actions>
              </v-form>



              <!-- FORGET PASSWORD FORM -->
              <v-form
                ref="form"
                style="padding-top: 25px"
                id="check-login-form"
                v-else
              >
                <v-card-text class="px-13">
                  <v-row>
                    <v-col
                      cols="auto"
                      @click.prevent="backToLogin"
                      class="pl-0 pt-7 cursor-pointer"
                      style="text-align: start"
                    >
                      <p
                        class="font-weight-medium fontSize15"
                        @click.prevent="backToLogin"
                      >
                        <v-icon color="#0064D7" class="mr-2"
                          >fa-arrow-left</v-icon
                        >Back
                      </p>
                    </v-col>
                  </v-row>
                  <p
                    class="textFontSize font-weight-normal"
                    style="text-align: start"
                  >
                    <span class="font-weight-medium" style="color: #0064d7"
                      >Forgot Password?</span
                    >
                    Enter your email address you're using for your account.
                  </p>
                  <v-text-field
                    name="Email Address"
                    placeholder="Email Address"
                    type="text"
                    prepend-inner-icon="mdi-forgot"
                    :rules="checkEmail"
                  ></v-text-field>




                  <!-- ALERT FORGET PASSWORD -->
                  <!-- <v-alert
                    outlined
                    style="border: solid 1px #009966; background-color: #fff6f5"
                    class="borderRadiusInfo align-center pa-3"
                    color="green"
                    dense
                    type="success"
                    transition="scale-transition"
                    v-if="email"
                  >
                    <strong>Email Sent!</strong> Please check your email and
                    click the reset password link.
                  </v-alert>
                  <v-alert
                    outlined
                    style="border: solid 1px #e59b96; background-color: #fff6f5"
                    class="borderRadiusInfo align-center pa-3"
                    :value="emailNotFound"
                    color="red"
                    dense
                    type="error"
                    transition="scale-transition"
                    v-else
                  >
                    <strong>Email Not Found!</strong> Please enter correct email
                    address.
                  </v-alert> -->
                </v-card-text>



                <!-- FORGET PASSWORD BUTTON -->
                <v-card-actions class="px-13 mt-4 mb-5">
                  <v-btn
                    type="submit"
                    block
                    form="check-login-form"
                    style="min-height: 51px; justify-content: space-between"
                    class="
                      buttonBackgroundShade
                      borderRadiusInfo
                      pl-5
                      textTransformUnset
                    "
                    ><span class="white--text">Send</span
                    ><v-icon color="#fff" class="mx-4">mdi-customSend</v-icon>
                  </v-btn>
                </v-card-actions>
              </v-form>

            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>


<script>
import '@/assets/scss/Login/_login.scss'
export default {
  name: 'LoginPage',
  layout: 'login',
  comments: {},
  data() {
    return {
      username: '',
      password: '',
      showPassword: '',
      AuthErrMsg: 'Incorrect username or password',
      isAuth: '',
      showPassword: true,
      isForgotPassword :'',
      email: null,
      password: null,
      checkEmail: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
    };
  },
  methods: {
    clickForgotPassword() {
      this.isForgotPassword = true;
    },
    backToLogin() {
      this.isForgotPassword = false;
    },
  },
}
</script>
