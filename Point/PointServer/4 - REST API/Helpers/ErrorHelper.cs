using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Collections.Generic;

namespace PaulKolesnik
{
    public class ErrorHelper
    {
        public static List<string> ExtractErrors(ModelStateDictionary modelState)
        {
            List<string> errors = new List<string>();

            foreach (KeyValuePair<string, ModelStateEntry> entry in modelState)
            {
                foreach (ModelError err in entry.Value.Errors)
                {
                    errors.Add(err.ErrorMessage);
                }
            }

            return errors;
        }

        public static string GetExceptionMessage(Exception ex)
        {
#if DEBUG
            return ExtractMessage(ex); // An exception occurred, check inner exception for details...
#else
            return "Some error occurred, please try again later.";
#endif
        }

        private static string ExtractMessage(Exception ex)
        {
            if (ex.InnerException == null)
                return ex.Message;
            return ExtractMessage(ex.InnerException);
        }
    }
}
